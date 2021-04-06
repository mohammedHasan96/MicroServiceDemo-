using Autofac;
using MicroServicesDemo.Basket.Data;
using MicroServicesDemo.Basket.IntegrationEvents.EventHandling;
using MicroServicesDemo.Basket.IntegrationEvents.Events;
using MicroServicesDemo.Basket.Settings;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.eShopOnContainers.BuildingBlocks.EventBus;
using Microsoft.eShopOnContainers.BuildingBlocks.EventBus.Abstractions;
using Microsoft.eShopOnContainers.BuildingBlocks.EventBusRabbitMQ;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.OpenApi.Models;
using RabbitMQ.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MicroServicesDemo.Basket
{
    public class Startup
    {
        public IConfiguration Configuration { get; }

        private readonly ILogger _logger;

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
            using var loggerFactory = LoggerFactory.Create(builder =>
            {
                builder.SetMinimumLevel(LogLevel.Information);
                builder.AddConsole();
                builder.AddEventSourceLogger();
            });
            _logger = loggerFactory.CreateLogger("Startup");
        }

        public void ConfigureServices(IServiceCollection services)
        {
            _logger.LogInformation("ConfigureServices");
            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "MicroServicesDemo.Basket", Version = "v1" });
            });

            services.AddDbContext<BasketDbContext>(options =>
                //options.UseInMemoryDatabase("DefaultDb"));
                options.UseNpgsql(Configuration.GetConnectionString("DefaultConnectionString")));

            services.AddSingleton<IRabbitMQPersistentConnection>(sp => GetDefaultRabbitMQPersistentConnection(sp));
            services.AddScoped<EventBusSettings>(sp => sp.GetService<IOptions<EventBusSettings>>().Value);
            services.Configure<EventBusSettings>(Configuration.GetSection(nameof(EventBusSettings)));

            RegisterEventBus(services);

            _logger.LogInformation("ConfigureServices Ok");
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, BasketDbContext dbContext)
        {
            _logger.LogInformation("Configure => Migrating Database...");
            dbContext.Database.Migrate();
            _logger.LogInformation("Configure => Database Migrated");

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "MicroServicesDemo.Basket v1"));
            }

            //app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            ConfigureEventBus(app);
        }


        #region Helpers

        private DefaultRabbitMQPersistentConnection GetDefaultRabbitMQPersistentConnection(IServiceProvider sp)
        {
            var logger = sp.GetRequiredService<ILogger<DefaultRabbitMQPersistentConnection>>();
            var settings = sp.GetService<EventBusSettings>();
            _logger.LogInformation($"EventBusSettings => {Newtonsoft.Json.JsonConvert.SerializeObject(settings)}");
            var factory = new ConnectionFactory()
            {
                HostName = settings.EventBusConnection,
                DispatchConsumersAsync = true
            };

            if (!string.IsNullOrEmpty(settings.EventBusUserName))
                factory.UserName = settings.EventBusUserName;

            if (!string.IsNullOrEmpty(settings.EventBusPassword))
                factory.Password = settings.EventBusPassword;

            var retryCount = 5;
            if (settings.EventBusRetryCount.HasValue)
                retryCount = settings.EventBusRetryCount.Value;

            return new DefaultRabbitMQPersistentConnection(factory, logger, retryCount);
        }

        private void RegisterEventBus(IServiceCollection services)
        {
            var sp = services.BuildServiceProvider();
            var settings = sp.GetService<EventBusSettings>();
            var subscriptionClientName = settings.SubscriptionClientName;
            services.AddSingleton<IEventBus, EventBusRabbitMQ>(sp =>
            {
                var rabbitMQPersistentConnection = sp.GetRequiredService<IRabbitMQPersistentConnection>();
                var iLifetimeScope = sp.GetRequiredService<ILifetimeScope>();
                var logger = sp.GetRequiredService<ILogger<EventBusRabbitMQ>>();
                var eventBusSubcriptionsManager = sp.GetRequiredService<IEventBusSubscriptionsManager>();

                var retryCount = 5;
                if (settings.EventBusRetryCount.HasValue)
                    retryCount = settings.EventBusRetryCount.Value;

                return new EventBusRabbitMQ(rabbitMQPersistentConnection, logger, iLifetimeScope, eventBusSubcriptionsManager, subscriptionClientName, retryCount);
            });

            services.AddSingleton<IEventBusSubscriptionsManager, InMemoryEventBusSubscriptionsManager>();
            services.AddTransient<ProductChangedIntegrationEventHandler>();
        }

        private void ConfigureEventBus(IApplicationBuilder app)
        {
            var eventBus = app.ApplicationServices.GetRequiredService<IEventBus>();
            eventBus.Subscribe<ProductChangedIntegrationEvent, ProductChangedIntegrationEventHandler>();
        }

        #endregion
    }
}

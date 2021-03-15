using MicroServicesDemo.Basket.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MicroServicesDemo.Basket
{
    public class Startup
    {
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

        public IConfiguration Configuration { get; }
        ILogger _logger;

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            _logger.LogInformation("ConfigureServices");
            _logger.LogInformation("ConfigureServices => adding controllers");
            services.AddControllers();
            _logger.LogInformation("ConfigureServices => controllers added");
            _logger.LogInformation("ConfigureServices => adding swagger");
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "MicroServicesDemo.Basket", Version = "v1" });
            });
            _logger.LogInformation("ConfigureServices => swagger added");

            //services.AddEntityFrameworkNpgsql()
            //   .AddDbContext<BasketDbContext>(options =>
            //       options.UseNpgsql(Configuration.GetConnectionString("DefaultConnectionString")));

            _logger.LogInformation("ConfigureServices => adding context");
            services.AddDbContext<BasketDbContext>(options => options.UseInMemoryDatabase("BasketDb"));
            _logger.LogInformation("ConfigureServices => context added");
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
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
        }
    }
}

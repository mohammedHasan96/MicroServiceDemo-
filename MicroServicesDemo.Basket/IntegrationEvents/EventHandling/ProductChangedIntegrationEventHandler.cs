using MicroServicesDemo.Basket.Data;
using MicroServicesDemo.Basket.IntegrationEvents.Events;
using Microsoft.EntityFrameworkCore;
using Microsoft.eShopOnContainers.BuildingBlocks.EventBus.Abstractions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MicroServicesDemo.Basket.IntegrationEvents.EventHandling
{
    public class ProductChangedIntegrationEventHandler : IIntegrationEventHandler<ProductChangedIntegrationEvent>
    {
        private readonly BasketDbContext _context;
        public ProductChangedIntegrationEventHandler(BasketDbContext basketDbContext)
        {
            _context = basketDbContext;
        }

        public async Task Handle(ProductChangedIntegrationEvent @event)
        {
            var basketItems = await _context.Baskets.Where(x => x.ProductId == @event.ProductId).ToArrayAsync();
            foreach (var item in basketItems)
            {
                item.ProductName = @event.Name;
                item.UnitPrice = @event.Price;
                item.PictureUrl = @event.PictureUrl;
            }
            _context.UpdateRange(basketItems);
            await _context.SaveChangesAsync();
        }
    }
}

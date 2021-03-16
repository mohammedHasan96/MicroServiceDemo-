using MicroServicesDemo.Basket.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MicroServicesDemo.Basket.Data
{
    public class BasketDbContext : DbContext
    {
        public BasketDbContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<BasketEntity> Baskets { get; set; }
    }
}

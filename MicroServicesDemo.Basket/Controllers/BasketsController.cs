using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MicroServicesDemo.Basket.Data;
using MicroServicesDemo.Basket.Models;

namespace MicroServicesDemo.Basket.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BasketsController : ControllerBase
    {
        private readonly BasketDbContext _context;

        public BasketsController(BasketDbContext context)
        {
            _context = context;
        }

        // GET: api/Baskets
        [HttpGet]
        public async Task<ActionResult<Wrapper<List<BasketEntity>>>> GetBaskets([FromQuery] string username)
        {
            return new Wrapper<List<BasketEntity>>
            {
                Data = await _context.Baskets.Where(x => username == null || x.UserName.ToLower() == username.ToLower()).ToListAsync(),
                Success = true
            };
        }

        // GET: api/Baskets/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Wrapper<BasketEntity>>> GetBasketEntity(int id)
        {
            var basketEntity = await _context.Baskets.FindAsync(id);

            if (basketEntity == null)
            {
                return NotFound(new Wrapper<object> { Success = false });
            }

            return new Wrapper<BasketEntity> { Data = basketEntity, Success = true };
        }

        // POST: api/Baskets
        [HttpPost]
        public async Task<ActionResult<Wrapper<BasketEntity>>> PostBasketEntity(BasketEntity basketEntity)
        {
            _context.Baskets.Add(basketEntity);
            await _context.SaveChangesAsync();

            return new Wrapper<BasketEntity> { Data = basketEntity, Success = true };
        }

        // DELETE: api/Baskets/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBasketEntity(int id)
        {
            var basketEntity = await _context.Baskets.FindAsync(id);
            if (basketEntity == null)
            {
                return NotFound(new Wrapper<object> { Success = false });
            }

            _context.Baskets.Remove(basketEntity);
            await _context.SaveChangesAsync();

            return Ok(new Wrapper<object> { Success = true });
        }
    }
}

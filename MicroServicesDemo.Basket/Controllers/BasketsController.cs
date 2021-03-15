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

        // GET: api/BasketEntities
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BasketEntity>>> GetBaskets([FromQuery] string username)
        {
            return await _context.Baskets.Where(x => username == null || x.UserName.ToLower() == username.ToLower()).ToListAsync();
        }

        // GET: api/BasketEntities/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BasketEntity>> GetBasketEntity(int id)
        {
            var basketEntity = await _context.Baskets.FindAsync(id);

            if (basketEntity == null)
            {
                return NotFound();
            }

            return basketEntity;
        }

        // POST: api/BasketEntities
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<BasketEntity>> PostBasketEntity(BasketEntity basketEntity)
        {
            _context.Baskets.Add(basketEntity);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBasketEntity", new { id = basketEntity.Id }, basketEntity);
        }

        // DELETE: api/BasketEntities/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBasketEntity(int id)
        {
            var basketEntity = await _context.Baskets.FindAsync(id);
            if (basketEntity == null)
            {
                return NotFound();
            }

            _context.Baskets.Remove(basketEntity);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}

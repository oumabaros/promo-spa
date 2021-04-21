using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using promos.Data;
using promos.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace promo.Controllers
{
    //Controller to load promos
    [Route("api/[controller]/[action]")]
    //[Authorize]
    [ApiController]
    public class PromosController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PromosController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Promos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Promos>>> GetPromos()
        {
            return await _context.Promos.ToListAsync();
        }

        // GET: api/Promos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Promos>> GetPromos(int id)
        {
            var promos = await _context.Promos.FindAsync(id);

            if (promos == null)
            {
                return NotFound();
            }

            return promos;
        }

        // PUT: api/Promos/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPromos(int id, Promos promos)
        {
            if (id != promos.Id)
            {
                return BadRequest();
            }

            _context.Entry(promos).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PromosExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Promos
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Promos>> PostPromos(Promos promos)
        {
            _context.Promos.Add(promos);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPromos", new { id = promos.Id }, promos);
        }

        // DELETE: api/Promos/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Promos>> DeletePromos(int id)
        {
            var promos = await _context.Promos.FindAsync(id);
            if (promos == null)
            {
                return NotFound();
            }

            _context.Promos.Remove(promos);
            await _context.SaveChangesAsync();

            return promos;
        }

        private bool PromosExists(int id)
        {
            return _context.Promos.Any(e => e.Id == id);
        }
    }
}

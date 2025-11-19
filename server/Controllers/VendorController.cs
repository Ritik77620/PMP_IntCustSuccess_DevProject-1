using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VendorController : ControllerBase
    {
        private readonly AppDbContext _context;

        public VendorController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/vendor
        [HttpGet]
        public async Task<IActionResult> GetVendors()
        {
            var vendors = await _context.Vendors.ToListAsync();
            return Ok(vendors);
        }

        // GET: api/vendor/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetVendor(int id)
        {
            var vendor = await _context.Vendors.FindAsync(id);
            if (vendor == null)
                return NotFound("Vendor not found");
            return Ok(vendor);
        }

        // POST: api/vendor
        [HttpPost]
        public async Task<IActionResult> CreateVendor([FromBody] Vendor vendorDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _context.Vendors.Add(vendorDto);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Vendor created successfully", vendor = vendorDto });
        }

        // PUT: api/vendor/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateVendor(int id, [FromBody] Vendor vendorDto)
        {
            var vendor = await _context.Vendors.FindAsync(id);
            if (vendor == null)
                return NotFound("Vendor not found");

            vendor.Name = vendorDto.Name;
            vendor.Email = vendorDto.Email;
            vendor.Phone = vendorDto.Phone;

            _context.Vendors.Update(vendor);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Vendor updated successfully", vendor });
        }

        // DELETE: api/vendor/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVendor(int id)
        {
            var vendor = await _context.Vendors.FindAsync(id);
            if (vendor == null)
                return NotFound("Vendor not found");

            _context.Vendors.Remove(vendor);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Vendor deleted successfully" });
        }
    }
}

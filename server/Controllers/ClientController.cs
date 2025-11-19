using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClientController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ClientController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/client
        [HttpGet]
        public async Task<IActionResult> GetClients()
        {
            var clients = await _context.Clients.ToListAsync();
            return Ok(clients);
        }

        // GET: api/client/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetClient(int id)
        {
            var client = await _context.Clients.FindAsync(id);
            if (client == null)
                return NotFound("Client not found");
            return Ok(client);
        }

        // POST: api/client
        [HttpPost]
        public async Task<IActionResult> CreateClient([FromBody] Client clientDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _context.Clients.Add(clientDto);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Client created successfully", client = clientDto });
        }

        // PUT: api/client/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateClient(int id, [FromBody] Client clientDto)
        {
            var client = await _context.Clients.FindAsync(id);
            if (client == null)
                return NotFound("Client not found");

            client.Name = clientDto.Name;
            client.Email = clientDto.Email;
            client.Phone = clientDto.Phone;

            _context.Clients.Update(client);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Client updated successfully", client });
        }

        // DELETE: api/client/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteClient(int id)
        {
            var client = await _context.Clients.FindAsync(id);
            if (client == null)
                return NotFound("Client not found");

            _context.Clients.Remove(client);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Client deleted successfully" });
        }
    }
}

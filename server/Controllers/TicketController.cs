using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TicketController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TicketController(AppDbContext context)
        {
            _context = context;
        }

        // ------------------------------
        // GET: api/ticket
        // Get all tickets
        // ------------------------------
        [HttpGet]
        public async Task<IActionResult> GetTickets()
        {
            var tickets = await _context.Tickets
                .Include(t => t.CreatedByUser)
                .Include(t => t.AssignedToUser)
                .ToListAsync();

            return Ok(tickets);
        }

        // ------------------------------
        // GET: api/ticket/{id}
        // Get ticket by id
        // ------------------------------
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTicket(int id)
        {
            var ticket = await _context.Tickets
                .Include(t => t.CreatedByUser)
                .Include(t => t.AssignedToUser)
                .FirstOrDefaultAsync(t => t.Id == id);

            if (ticket == null)
                return NotFound("Ticket not found");

            return Ok(ticket);
        }

        // ------------------------------
        // POST: api/ticket
        // Create new ticket
        // ------------------------------
        [HttpPost]
        public async Task<IActionResult> CreateTicket([FromBody] Ticket ticketDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _context.Tickets.Add(ticketDto);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Ticket created successfully", ticket = ticketDto });
        }

        // ------------------------------
        // PUT: api/ticket/{id}
        // Update existing ticket
        // ------------------------------
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTicket(int id, [FromBody] Ticket ticketDto)
        {
            var ticket = await _context.Tickets.FindAsync(id);
            if (ticket == null)
                return NotFound("Ticket not found");

            // Update fields
            ticket.Title = ticketDto.Title;
            ticket.Description = ticketDto.Description;
            ticket.AssignedToUserId = ticketDto.AssignedToUserId;
            ticket.Priority = ticketDto.Priority;

            _context.Tickets.Update(ticket);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Ticket updated successfully", ticket });
        }

        // ------------------------------
        // DELETE: api/ticket/{id}
        // Delete ticket
        // ------------------------------
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTicket(int id)
        {
            var ticket = await _context.Tickets.FindAsync(id);
            if (ticket == null)
                return NotFound("Ticket not found");

            _context.Tickets.Remove(ticket);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Ticket deleted successfully" });
        }
    }
}

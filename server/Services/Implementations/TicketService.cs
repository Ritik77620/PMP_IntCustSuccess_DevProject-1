using server.Data;
using server.Models;
using server.DTOs;
using Microsoft.EntityFrameworkCore;
using server.Services.Interfaces;

namespace server.Services.Implementations
{
    public class TicketService : ITicketService
    {
        private readonly AppDbContext _context;

        public TicketService(AppDbContext context)
        {
            _context = context;
        }

        // ✅ Get all tickets
        public async Task<IEnumerable<Ticket>> GetAllAsync()
        {
            return await _context.Tickets
                .Include(t => t.CreatedByUser)
                .Include(t => t.AssignedToUser)
                .ToListAsync();
        }

        // ✅ Get single ticket by ID
        public async Task<Ticket?> GetByIdAsync(int id)
        {
            return await _context.Tickets
                .Include(t => t.CreatedByUser)
                .Include(t => t.AssignedToUser)
                .FirstOrDefaultAsync(t => t.Id == id);
        }

        // ✅ Create new ticket
        public async Task<Ticket> CreateAsync(CreateTicketDTO dto)
        {
            var ticket = new Ticket
            {
                Title = dto.Title,
                Description = dto.Description,
                Priority = dto.Priority,
                CreatedByUserId = dto.CreatedByUserId,
                AssignedToUserId = dto.AssignedToUserId,
                CreatedAt = DateTime.Now
            };

            _context.Tickets.Add(ticket);
            await _context.SaveChangesAsync();

            return ticket;
        }

        // ✅ Update ticket
        public async Task<Ticket?> UpdateAsync(int id, CreateTicketDTO dto)
        {
            var ticket = await _context.Tickets.FindAsync(id);
            if (ticket == null)
                return null;

            ticket.Title = dto.Title;
            ticket.Description = dto.Description;
            ticket.Priority = dto.Priority;
            ticket.AssignedToUserId = dto.AssignedToUserId;

            await _context.SaveChangesAsync();
            return ticket;
        }

        // ✅ Delete ticket
        public async Task<bool> DeleteAsync(int id)
        {
            var ticket = await _context.Tickets.FindAsync(id);
            if (ticket == null)
                return false;

            _context.Tickets.Remove(ticket);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}

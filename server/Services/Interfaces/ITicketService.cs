using server.DTOs;
using server.Models;

namespace server.Services.Interfaces
{
    public interface ITicketService
    {
        Task<IEnumerable<Ticket>> GetAllAsync();
        Task<Ticket?> GetByIdAsync(int id);
        Task<Ticket> CreateAsync(CreateTicketDTO dto);
        Task<Ticket?> UpdateAsync(int id, CreateTicketDTO dto);
        Task<bool> DeleteAsync(int id);
    }
}

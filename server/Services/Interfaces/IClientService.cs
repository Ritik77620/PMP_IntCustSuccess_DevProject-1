using server.DTOs;
using server.Models;

namespace server.Services.Interfaces
{
    public interface IClientService
    {
        Task<IEnumerable<Client>> GetAllAsync();
        Task<Client?> GetByIdAsync(int id);
        Task<Client> CreateAsync(CreateClientDTO dto);
        Task<Client?> UpdateAsync(int id, CreateClientDTO dto);
        Task<bool> DeleteAsync(int id);
    }
}

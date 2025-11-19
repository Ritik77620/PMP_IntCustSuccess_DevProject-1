using server.DTOs;
using server.Models;

namespace server.Services.Interfaces
{
    public interface IVendorService
    {
        Task<IEnumerable<Vendor>> GetAllAsync();
        Task<Vendor?> GetByIdAsync(int id);
        Task<Vendor> CreateAsync(CreateVendorDTO dto);
        Task<Vendor?> UpdateAsync(int id, CreateVendorDTO dto);
        Task<bool> DeleteAsync(int id);
    }
}

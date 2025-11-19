using server.DTOs;
using server.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace server.Services.Interfaces
{
    public interface IVendorWorkService
    {
        Task<IEnumerable<VendorWork>> GetAllAsync();
        Task<VendorWork?> GetByIdAsync(int id);
        Task<VendorWork> CreateAsync(VendorWorkDTO dto);
        Task<VendorWork?> UpdateAsync(int id, VendorWorkDTO dto);
        Task<bool> DeleteAsync(int id);
    }
}

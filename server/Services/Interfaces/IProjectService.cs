using server.DTOs;
using server.Models;

namespace server.Services.Interfaces
{
    public interface IProjectService
    {
        Task<IEnumerable<Project>> GetAllAsync();
        Task<Project?> GetByIdAsync(int id);
        Task<Project> CreateAsync(CreateProjectDTO dto);
        Task<Project?> UpdateAsync(int id, CreateProjectDTO dto);
        Task<bool> DeleteAsync(int id);
    }
}

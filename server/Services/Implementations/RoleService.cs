using Microsoft.EntityFrameworkCore;
using server.Data;
using server.DTOs;
using server.Models;
using server.Services.Interfaces;

namespace server.Services.Implementations
{
    public class RoleService : IRoleService
    {
        private readonly AppDbContext _context;

        public RoleService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<RoleDTO>> GetAllAsync()
        {
            return await _context.Roles
                .Select(r => new RoleDTO
                {
                    Id = r.Id,
                    Name = r.Name,
                    Description = r.Description
                })
                .ToListAsync();
        }

        public async Task<RoleDTO?> GetByIdAsync(int id)
        {
            var role = await _context.Roles.FindAsync(id);
            if (role == null) return null;

            return new RoleDTO
            {
                Id = role.Id,
                Name = role.Name,
                Description = role.Description
            };
        }

        public async Task<RoleDTO> CreateAsync(RoleDTO roleDTO)
        {
            var role = new Role
            {
                Name = roleDTO.Name,
                Description = roleDTO.Description
            };

            _context.Roles.Add(role);
            await _context.SaveChangesAsync();

            roleDTO.Id = role.Id;
            return roleDTO;
        }

        public async Task<RoleDTO?> UpdateAsync(int id, RoleDTO roleDTO)
        {
            var role = await _context.Roles.FindAsync(id);
            if (role == null) return null;

            role.Name = roleDTO.Name;
            role.Description = roleDTO.Description;

            await _context.SaveChangesAsync();

            return new RoleDTO
            {
                Id = role.Id,
                Name = role.Name,
                Description = role.Description
            };
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var role = await _context.Roles.FindAsync(id);
            if (role == null) return false;

            _context.Roles.Remove(role);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}

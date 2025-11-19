using server.Data;
using server.DTOs;
using server.Models;
using server.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

using UserModel = server.Models.User;

namespace server.Services
{
    public class UserService : IUserService
    {
        private readonly AppDbContext _context;

        public UserService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<UserModel> RegisterUserAsync(RegisterUserDTO dto)
        {
            // Create a new user and assign a default role if available
            var defaultRole = await _context.Roles
                .FirstOrDefaultAsync(r => r.Name == "User"); // assumes "User" role exists

            var user = new UserModel
            {
                FullName = dto.FullName,
                Email = dto.Email,
                PasswordHash = dto.Password, // ⚠️ TODO: Hash password securely (e.g., BCrypt)
                Role = defaultRole! // safe assignment (null if no role found)
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return user;
        }

        public async Task<(string? Token, UserModel? User)> LoginUserAsync(LoginDTO dto)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == dto.Email && u.PasswordHash == dto.Password);

            if (user == null)
                return (null, null);

            // ⚠️ TODO: Replace with real JWT token logic later
            string token = "sample-jwt-token";

            return (token, user);
        }

        public async Task<List<UserModel>> GetAllUsersAsync()
        {
            return await _context.Users
                .Include(u => u.Role)
                .ToListAsync();
        }

        public async Task<UserModel?> GetUserByIdAsync(int id)
        {
            return await _context.Users
                .Include(u => u.Role)
                .FirstOrDefaultAsync(u => u.Id == id);
        }

        public async Task<bool> DeleteUserAsync(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return false;

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}

using Microsoft.EntityFrameworkCore;
using server.Data;
using server.DTOs;
using server.Models;
using server.Services.Interfaces;

namespace server.Services.Implementations
{
    public class ProjectService : IProjectService
    {
        private readonly AppDbContext _context;

        public ProjectService(AppDbContext context)
        {
            _context = context;
        }

        // ------------------------------
        // GET ALL PROJECTS
        // ------------------------------
        public async Task<IEnumerable<Project>> GetAllAsync()
        {
            return await _context.Projects
                .Include(p => p.Client)
                .Include(p => p.Tasks)
                .ToListAsync();
        }

        // ------------------------------
        // GET PROJECT BY ID
        // ------------------------------
        public async Task<Project?> GetByIdAsync(int id)
        {
            return await _context.Projects
                .Include(p => p.Client)
                .Include(p => p.Tasks)
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        // ------------------------------
        // CREATE NEW PROJECT
        // ------------------------------
        public async Task<Project> CreateAsync(CreateProjectDTO dto)
        {
            var project = new Project
            {
                ProjectName = dto.ProjectName,
                ClientId = dto.ClientId,
                StartDate = dto.StartDate,
                EndDate = dto.EndDate,
                Status = dto.Status ?? "Pending"
            };

            _context.Projects.Add(project);
            await _context.SaveChangesAsync();
            return project;
        }

        // ------------------------------
        // UPDATE EXISTING PROJECT
        // ------------------------------
        public async Task<Project?> UpdateAsync(int id, CreateProjectDTO dto)
        {
            var project = await _context.Projects.FindAsync(id);
            if (project == null) return null;

            project.ProjectName = dto.ProjectName ?? project.ProjectName;
            project.ClientId = dto.ClientId;
            project.StartDate = dto.StartDate ?? project.StartDate;
            project.EndDate = dto.EndDate ?? project.EndDate;
            project.Status = dto.Status ?? project.Status;

            _context.Projects.Update(project);
            await _context.SaveChangesAsync();
            return project;
        }

        // ------------------------------
        // DELETE PROJECT
        // ------------------------------
        public async Task<bool> DeleteAsync(int id)
        {
            var project = await _context.Projects.FindAsync(id);
            if (project == null) return false;

            _context.Projects.Remove(project);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}

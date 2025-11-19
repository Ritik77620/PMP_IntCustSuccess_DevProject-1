using Microsoft.EntityFrameworkCore;
using server.Data;
using server.DTOs;
using server.Models;
using server.Services.Interfaces;

namespace server.Services.Implementations
{
    public class TaskService : ITaskService
    {
        private readonly AppDbContext _context;

        public TaskService(AppDbContext context)
        {
            _context = context;
        }

        // ------------------------------
        // GET ALL TASKS
        // ------------------------------
        public async Task<IEnumerable<ProjectTask>> GetAllAsync()
        {
            return await _context.ProjectTasks
                .Include(t => t.Project)
                .Include(t => t.AssignedToUser)
                .ToListAsync();
        }

        // ------------------------------
        // GET TASK BY ID
        // ------------------------------
        public async Task<ProjectTask?> GetByIdAsync(int id)
        {
            return await _context.ProjectTasks
                .Include(t => t.Project)
                .Include(t => t.AssignedToUser)
                .FirstOrDefaultAsync(t => t.Id == id);
        }

        // ------------------------------
        // CREATE NEW TASK
        // ------------------------------
        public async Task<ProjectTask> CreateAsync(CreateTaskDTO dto)
        {
            var task = new ProjectTask
            {
                Title = dto.Title,
                Description = dto.Description ?? string.Empty,
                Priority = dto.Priority ?? "Normal",
                Status = dto.Status ?? "Pending",
                ProjectId = dto.ProjectId,
                AssignedToUserId = dto.AssignedToUserId,
                DueDate = dto.DueDate
            };

            _context.ProjectTasks.Add(task);
            await _context.SaveChangesAsync();
            return task;
        }

        // ------------------------------
        // UPDATE EXISTING TASK
        // ------------------------------
        public async Task<ProjectTask?> UpdateAsync(int id, CreateTaskDTO dto)
        {
            var task = await _context.ProjectTasks.FindAsync(id);
            if (task == null) return null;

            task.Title = dto.Title ?? task.Title;
            task.Description = dto.Description ?? task.Description;
            task.Priority = dto.Priority ?? task.Priority;
            task.Status = dto.Status ?? task.Status;
            task.ProjectId = dto.ProjectId;
            task.AssignedToUserId = dto.AssignedToUserId;
            task.DueDate = dto.DueDate ?? task.DueDate;

            _context.ProjectTasks.Update(task);
            await _context.SaveChangesAsync();
            return task;
        }

        // ------------------------------
        // DELETE TASK
        // ------------------------------
        public async Task<bool> DeleteAsync(int id)
        {
            var task = await _context.ProjectTasks.FindAsync(id);
            if (task == null) return false;

            _context.ProjectTasks.Remove(task);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}

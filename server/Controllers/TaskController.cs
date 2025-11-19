using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;
using server.DTOs;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TaskController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TaskController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/task
        [HttpGet]
        public async Task<IActionResult> GetTasks()
        {
            var tasks = await _context.ProjectTasks
                .Include(t => t.Project)
                .Include(t => t.AssignedToUser)
                .ToListAsync();

            return Ok(tasks);
        }

        // GET: api/task/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTask(int id)
        {
            var task = await _context.ProjectTasks
                .Include(t => t.Project)
                .Include(t => t.AssignedToUser)
                .FirstOrDefaultAsync(t => t.Id == id);

            if (task == null)
                return NotFound("Task not found");

            return Ok(task);
        }

        // POST: api/task
        [HttpPost]
        public async Task<IActionResult> CreateTask([FromBody] CreateTaskDTO dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var newTask = new ProjectTask
            {
                Title = dto.Title,
                Description = dto.Description ?? "",
                ProjectId = dto.ProjectId,
                AssignedToUserId = dto.AssignedToUserId,
                Status = dto.Status ?? "Pending",
                Priority = dto.Priority ?? "Normal",
                DueDate = dto.DueDate
            };

            _context.ProjectTasks.Add(newTask);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Task created successfully", task = newTask });
        }

        // PUT: api/task/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTask(int id, [FromBody] CreateTaskDTO dto)
        {
            var task = await _context.ProjectTasks.FindAsync(id);
            if (task == null)
                return NotFound("Task not found");

            task.Title = dto.Title ?? task.Title;
            task.Description = dto.Description ?? task.Description;
            task.ProjectId = dto.ProjectId;
            task.AssignedToUserId = dto.AssignedToUserId;
            task.Status = dto.Status ?? task.Status;
            task.Priority = dto.Priority ?? task.Priority;
            task.DueDate = dto.DueDate ?? task.DueDate;

            await _context.SaveChangesAsync();

            return Ok(new { message = "Task updated successfully", task });
        }

        // DELETE: api/task/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            var task = await _context.ProjectTasks.FindAsync(id);
            if (task == null)
                return NotFound("Task not found");

            _context.ProjectTasks.Remove(task);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Task deleted successfully" });
        }
    }
}

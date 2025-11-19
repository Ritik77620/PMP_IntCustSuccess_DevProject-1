using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TaskTrackerController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TaskTrackerController(AppDbContext context)
        {
            _context = context;
        }

        // ------------------------------
        // GET: api/tasktracker
        // Get all task trackers
        // ------------------------------
        [HttpGet]
        public async Task<IActionResult> GetTaskTrackers()
        {
            var trackers = await _context.TaskTrackers
                .Include(tt => tt.Task)
                .ToListAsync();

            return Ok(trackers);
        }

        // ------------------------------
        // GET: api/tasktracker/{id}
        // Get task tracker by id
        // ------------------------------
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTaskTracker(int id)
        {
            var tracker = await _context.TaskTrackers
                .Include(tt => tt.Task)
                .FirstOrDefaultAsync(tt => tt.Id == id);

            if (tracker == null)
                return NotFound("Task tracker not found");

            return Ok(tracker);
        }

        // ------------------------------
        // POST: api/tasktracker
        // Create new task tracker
        // ------------------------------
        [HttpPost]
        public async Task<IActionResult> CreateTaskTracker([FromBody] TaskTracker trackerDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _context.TaskTrackers.Add(trackerDto);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Task tracker created successfully", tracker = trackerDto });
        }

        // ------------------------------
        // PUT: api/tasktracker/{id}
        // Update existing task tracker
        // ------------------------------
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTaskTracker(int id, [FromBody] TaskTracker trackerDto)
        {
            var tracker = await _context.TaskTrackers.FindAsync(id);
            if (tracker == null)
                return NotFound("Task tracker not found");

            tracker.TaskId = trackerDto.TaskId;
            tracker.Progress = trackerDto.Progress;
            tracker.UpdatedAt = trackerDto.UpdatedAt;

            _context.TaskTrackers.Update(tracker);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Task tracker updated successfully", tracker });
        }

        // ------------------------------
        // DELETE: api/tasktracker/{id}
        // Delete task tracker
        // ------------------------------
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTaskTracker(int id)
        {
            var tracker = await _context.TaskTrackers.FindAsync(id);
            if (tracker == null)
                return NotFound("Task tracker not found");

            _context.TaskTrackers.Remove(tracker);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Task tracker deleted successfully" });
        }
    }
}

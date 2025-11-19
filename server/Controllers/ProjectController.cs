using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;
using System.Threading.Tasks;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProjectController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProjectController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetProjects()
        {
            var projects = await _context.Projects
                .Include(p => p.Client)
                .ToListAsync();
            return Ok(projects);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProject(int id)
        {
            var project = await _context.Projects
                .Include(p => p.Client)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (project == null)
                return NotFound("Project not found");

            return Ok(project);
        }

        [HttpPost]
        public async Task<IActionResult> CreateProject([FromBody] Project projectDto)
        {
            if (projectDto == null || !ModelState.IsValid)
                return BadRequest("Invalid project data");

            _context.Projects.Add(projectDto);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Project created successfully", project = projectDto });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProject(int id, [FromBody] Project projectDto)
        {
            if (projectDto == null)
                return BadRequest("Invalid project data");

            var project = await _context.Projects.FindAsync(id);
            if (project == null)
                return NotFound("Project not found");

            project.ProjectName = projectDto.ProjectName ?? project.ProjectName;
            project.ClientId = projectDto.ClientId;
            project.StartDate = projectDto.StartDate ?? project.StartDate;
            project.EndDate = projectDto.EndDate ?? project.EndDate;
            project.Status = projectDto.Status ?? project.Status;

            _context.Projects.Update(project);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Project updated successfully", project });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProject(int id)
        {
            var project = await _context.Projects.FindAsync(id);
            if (project == null)
                return NotFound("Project not found");

            _context.Projects.Remove(project);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Project deleted successfully" });
        }
    }
}

using Microsoft.AspNetCore.Mvc;
using server.DTOs;
using server.Services.Interfaces;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RoleController : ControllerBase
    {
        private readonly IRoleService _roleService;

        public RoleController(IRoleService roleService)
        {
            _roleService = roleService;
        }

        // GET: api/Role
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var roles = await _roleService.GetAllAsync();
            return Ok(roles);
        }

        // GET: api/Role/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var role = await _roleService.GetByIdAsync(id);
            if (role == null)
                return NotFound();
            return Ok(role);
        }

        // POST: api/Role
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] RoleDTO roleDTO)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var createdRole = await _roleService.CreateAsync(roleDTO);
            return CreatedAtAction(nameof(GetById), new { id = createdRole.Id }, createdRole);
        }

        // PUT: api/Role/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] RoleDTO roleDTO)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var updatedRole = await _roleService.UpdateAsync(id, roleDTO);
            if (updatedRole == null)
                return NotFound();

            return Ok(updatedRole);
        }

        // DELETE: api/Role/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _roleService.DeleteAsync(id);
            if (!deleted)
                return NotFound();

            return NoContent();
        }
    }
}

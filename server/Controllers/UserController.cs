using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.DTOs;              // Make sure this points to your DTOs folder
using server.Services.Interfaces;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        // ------------------------------
        // REGISTER NEW USER
        // ------------------------------
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterUserDTO dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = await _userService.RegisterUserAsync(dto);
            return Ok(user);
        }

        // ------------------------------
        // LOGIN USER
        // ------------------------------
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _userService.LoginUserAsync(dto);
            return Ok(new { token = result.Token, user = result.User });
        }

        // ------------------------------
        // GET ALL USERS (ADMIN ONLY)
        // ------------------------------
        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var users = await _userService.GetAllUsersAsync();
            return Ok(users);
        }

        // ------------------------------
        // GET USER BY ID
        // ------------------------------
        [Authorize]
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var user = await _userService.GetUserByIdAsync(id);
            if (user == null)
                return NotFound(new { message = "User not found" });

            return Ok(user);
        }

        // ------------------------------
        // DELETE USER (ADMIN ONLY)
        // ------------------------------
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var success = await _userService.DeleteUserAsync(id);
            if (!success)
                return BadRequest(new { message = "Unable to delete user" });

            return Ok(new { message = "User deleted successfully" });
        }
    }
}

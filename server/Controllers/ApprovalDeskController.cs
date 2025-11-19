using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ApprovalDeskController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ApprovalDeskController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllApprovals()
        {
            var approvals = await _context.ApprovalDesks
                .Include(a => a.Project)
                .Include(a => a.VendorWork)
                .ThenInclude(vw => vw.Vendor)
                .ToListAsync();

            return Ok(approvals);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetApprovalById(int id)
        {
            var approval = await _context.ApprovalDesks
                .Include(a => a.Project)
                .Include(a => a.VendorWork)
                .ThenInclude(vw => vw.Vendor)
                .FirstOrDefaultAsync(a => a.Id == id);

            if (approval == null)
                return NotFound(new { message = "Approval not found" });

            return Ok(approval);
        }

        [HttpPost]
        public async Task<IActionResult> CreateApproval([FromBody] ApprovalDesk approvalDesk)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _context.ApprovalDesks.Add(approvalDesk);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetApprovalById), new { id = approvalDesk.Id }, approvalDesk);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateApproval(int id, [FromBody] ApprovalDesk updatedApproval)
        {
            var approval = await _context.ApprovalDesks.FindAsync(id);
            if (approval == null)
                return NotFound(new { message = "Approval not found" });

            approval.Status = updatedApproval.Status;
            approval.ProjectId = updatedApproval.ProjectId;
            approval.VendorWorkId = updatedApproval.VendorWorkId;

            _context.ApprovalDesks.Update(approval);
            await _context.SaveChangesAsync();

            return Ok(approval);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteApproval(int id)
        {
            var approval = await _context.ApprovalDesks.FindAsync(id);
            if (approval == null)
                return NotFound(new { message = "Approval not found" });

            _context.ApprovalDesks.Remove(approval);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}

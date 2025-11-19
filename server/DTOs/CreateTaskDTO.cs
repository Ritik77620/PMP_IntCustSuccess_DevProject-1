namespace server.DTOs
{
    public class CreateTaskDTO
    {
        public string Title { get; set; } = string.Empty;  // ✅ matches ProjectTask.Title
        public string? Description { get; set; }
        public string? Priority { get; set; } = "Normal";
        public string? Status { get; set; } = "Pending";
        public int ProjectId { get; set; }
        public int? AssignedToUserId { get; set; }  // ✅ optional assignment
        public DateTime? DueDate { get; set; }      // ✅ matches model
    }
}

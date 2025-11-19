namespace server.DTOs
{
    public class CreateProjectDTO
    {
        public string ProjectName { get; set; } = string.Empty;
        public int ClientId { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string? Status { get; set; }
    }
}

using System;

namespace server.DTOs
{
    public class ProjectDTO
    {
        public string Name { get; set; } = null!;
        public string? Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string Status { get; set; } = null!;
        public int ClientId { get; set; }
    }
}

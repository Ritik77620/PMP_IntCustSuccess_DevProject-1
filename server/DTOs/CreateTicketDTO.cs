namespace server.DTOs
{
    public class CreateTicketDTO
    {
        public string Title { get; set; } = null!;
        public string Description { get; set; } = null!;
        public string Priority { get; set; } = "Medium";
        public int CreatedByUserId { get; set; }
        public int? AssignedToUserId { get; set; }
    }
}

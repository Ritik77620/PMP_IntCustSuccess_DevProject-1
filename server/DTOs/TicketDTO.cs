namespace server.DTOs
{
    public class TicketDTO
    {
        public int Id { get; set; }
        public string Subject { get; set; } = null!;
        public string Description { get; set; } = null!;
        public string Status { get; set; } = null!;
        public string Priority { get; set; } = null!;
        public string CreatedByName { get; set; } = null!;
        public string AssignedToName { get; set; } = null!;
    }

}

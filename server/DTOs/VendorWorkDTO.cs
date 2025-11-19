namespace server.DTOs
{
    public class VendorWorkDTO
    {
        public int VendorId { get; set; }
        public string ProjectName { get; set; } = string.Empty;
        public string WorkDescription { get; set; } = string.Empty;
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Status { get; set; } = "Pending";
    }
}

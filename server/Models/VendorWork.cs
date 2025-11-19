namespace server.Models
{
    public class VendorWork
    {
        public int Id { get; set; }
        public int VendorId { get; set; }
        public Vendor Vendor { get; set; } = null!;

        public string ProjectName { get; set; } = string.Empty;
        public string WorkDescription { get; set; } = string.Empty;
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Status { get; set; } = "Pending"; // Default
    }
}

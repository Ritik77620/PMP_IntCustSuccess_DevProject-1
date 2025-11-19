using System.ComponentModel.DataAnnotations;

namespace server.Models
{
    public class Vendor
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; } = null!;

        public string Email { get; set; } = null!;
        public string Phone { get; set; } = null!;

        public ICollection<VendorWork> VendorWorks { get; set; } = new List<VendorWork>();
    }
}

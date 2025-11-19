using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
    public class Ticket
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(200)]
        public string Title { get; set; } = null!;

        [Required]
        public string Description { get; set; } = null!;

        [Required]
        [MaxLength(50)]
        public string Priority { get; set; } = "Medium"; // Low, Medium, High

        public int CreatedByUserId { get; set; }

        public int? AssignedToUserId { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;

        [ForeignKey("CreatedByUserId")]
        public User CreatedByUser { get; set; } = null!;

        [ForeignKey("AssignedToUserId")]
        public User? AssignedToUser { get; set; }
    }
}

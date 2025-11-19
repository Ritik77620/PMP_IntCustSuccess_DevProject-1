using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
    public class ProjectTask
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Title is required")]
        public string Title { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        // Foreign key for Project
        public int ProjectId { get; set; }

        [ForeignKey("ProjectId")]
        public Project Project { get; set; } = null!; // non-null but initialized later

        // Assigned user
        public int? AssignedToUserId { get; set; }

        [ForeignKey("AssignedToUserId")]
        public User AssignedToUser { get; set; } = null!; // optional assignment

        public string Priority { get; set; } = "Normal"; // Low, Normal, High
        public string Status { get; set; } = "Pending";  // Pending, InProgress, Completed
        public DateTime? DueDate { get; set; }
    }
}

using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
    public class TaskTracker
    {
        [Key]
        public int Id { get; set; }

        public int TaskId { get; set; }
        [ForeignKey("TaskId")]
        public ProjectTask Task { get; set; } = null!; // EF Core will populate this

        [Range(0, 100)]
        public int Progress { get; set; }  // Percentage completion

        public DateTime UpdatedAt { get; set; } = DateTime.Now;
    }
}

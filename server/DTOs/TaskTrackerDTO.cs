using System;

namespace server.DTOs
{
    public class TaskTrackerDTO
    {
        public int TaskId { get; set; }     // FK to ProjectTask
        public int Progress { get; set; }  // InProgress, Completed
        public DateTime? StartTime { get; set; }
        public DateTime? EndTime { get; set; }
        public string? Remarks { get; set; }
    }
}

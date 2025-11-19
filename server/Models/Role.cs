namespace server.Models
{
    public class Role
    {
        public int Id { get; set; }               // Primary Key
        public string Name { get; set; } = null!; // Role Name, eg. Admin, User
        public string? Description { get; set; }  // Optional description
    }
}

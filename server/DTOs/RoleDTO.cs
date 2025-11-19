namespace server.DTOs
{
    public class RoleDTO
    {
        public int Id { get; set; }               // Role Id
        public string Name { get; set; } = null!; // Role Name
        public string? Description { get; set; }  // Optional description
    }
}

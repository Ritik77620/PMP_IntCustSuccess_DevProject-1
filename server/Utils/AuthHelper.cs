using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using server.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BCrypt.Net;

namespace server.Utils
{
    public static class AuthHelper
    {
        // Generate JWT token
        public static string GenerateJwtToken(User user, IConfiguration config)
{
    if (user == null) throw new ArgumentNullException(nameof(user));
    if (config == null) throw new ArgumentNullException(nameof(config));

    var keyString = config["Jwt:Key"];
    var issuer = config["Jwt:Issuer"];
    var audience = config["Jwt:Audience"];
    var validityMinutesString = config["Jwt:TokenValidityMinutes"];

    if (string.IsNullOrEmpty(keyString) || string.IsNullOrEmpty(issuer) || 
        string.IsNullOrEmpty(audience) || string.IsNullOrEmpty(validityMinutesString))
        throw new InvalidOperationException("JWT configuration is missing!");

    if (!double.TryParse(validityMinutesString, out double validityMinutes))
        throw new InvalidOperationException("Invalid TokenValidityMinutes in config");

    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(keyString));
    var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

    var claims = new List<Claim>
    {
        new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
        new Claim(ClaimTypes.Name, user.Username ?? user.FullName ?? "Unknown"), // Use existing property
        new Claim(ClaimTypes.Email, user.Email ?? ""),
        new Claim(ClaimTypes.Role, user.Role?.Name ?? "User") // Use Role.Name safely
    };

    var token = new JwtSecurityToken(
        issuer: issuer,
        audience: audience,
        claims: claims,
        expires: DateTime.UtcNow.AddMinutes(validityMinutes),
        signingCredentials: creds
    );

    return new JwtSecurityTokenHandler().WriteToken(token);
}


        // Hash password
        public static string HashPassword(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password);
        }

        // Verify password
        public static bool VerifyPassword(string password, string hashed)
        {
            return BCrypt.Net.BCrypt.Verify(password, hashed);
        }
    }
}

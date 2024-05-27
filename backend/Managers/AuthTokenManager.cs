using API.Entities;
using API.Interfaces.Managers;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace API.Managers
{
    public class AuthTokenManager : IAuthTokenManager
    {
        private readonly IConfiguration _configuration;
        private readonly UserManager<User> _userManager;
        private readonly int tokenExpirationInMinutes = 120;

        public AuthTokenManager(IConfiguration configuration, UserManager<User> userManager)
        {
            _configuration = configuration;
            _userManager = userManager;
        }

        public async Task<string> GenerateToken(User user)
        {
            // add the roles here for claims
            var roles = await _userManager.GetRolesAsync(user);
            var claims = new List<Claim>();
            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }
            claims.Add(new Claim(ClaimTypes.Name, user.UserName));
            var secretKey = _configuration.GetSection("Jwt").GetSection("Token").Get<string>();
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            var tokenDescription = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddMinutes(tokenExpirationInMinutes),
                SigningCredentials = creds
            };
            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescription);

            return tokenHandler.WriteToken(token);
        }
    }
}

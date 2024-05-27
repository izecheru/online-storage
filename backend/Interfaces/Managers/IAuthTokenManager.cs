using API.Entities;

namespace API.Interfaces.Managers
{
    public interface IAuthTokenManager
    {
        Task<string> GenerateToken(User user);
    }
}

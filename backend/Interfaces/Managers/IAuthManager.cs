using API.Models.Input;
using API.Models.Output;

namespace API.Interfaces.Managers
{
    public interface IAuthManager
    {
        Task<LoginReturnModel> Login(LoginModel login);
        Task SignUp(UserCreateModel newUser, List<string> roles);
    }
}

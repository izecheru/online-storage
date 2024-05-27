using API.Entities;
using API.Interfaces.Managers;
using API.Models.Input;
using API.Models.Output;
using Microsoft.AspNetCore.Identity;

namespace API.Managers
{
    public class AuthManager : IAuthManager
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IAuthTokenManager _authTokenManager;
        public AuthManager(UserManager<User> userManager, SignInManager<User> signInManager, IAuthTokenManager authTokenManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _authTokenManager = authTokenManager;
        }

        public async Task<LoginReturnModel> Login(LoginModel login)
        {
            if (login.Username != string.Empty)
            {
                // user name auth
                var userByUsername = await _userManager.FindByNameAsync(login.Username);

                if (userByUsername == null)
                {
                    throw new Exception("Create an account first!");
                }

                var tryLoginUsername = await _userManager.CheckPasswordAsync(userByUsername, login.Password);

                if (!tryLoginUsername)
                    throw new Exception("Incorrect password!");

                var userToken = await _authTokenManager.GenerateToken(userByUsername);
                var userRoles = await _userManager.GetRolesAsync(userByUsername);
                var result = new LoginReturnModel()
                {
                    Id = userByUsername.Id,
                    AuthToken = userToken,
                    UserName = userByUsername.UserName,
                    Role = (List<string>)userRoles
                };

                return result;
            }
            // email auth
            var user = await _userManager.FindByEmailAsync(login.Email);

            if (user == null)
            {
                throw new Exception("Create an account first!");
            }

            var tryLogin = await _userManager.CheckPasswordAsync(user, login.Password);

            if (!tryLogin)
                throw new Exception("Incorrect password!");

            var token = await _authTokenManager.GenerateToken(user);
            var role = await _userManager.GetRolesAsync(user);
            var toReturn = new LoginReturnModel()
            {
                Id = user.Id,
                AuthToken = token,
                UserName = user.UserName,
                Role = (List<string>)role
            };

            return toReturn;
        }

        public async Task SignUp(UserCreateModel newUser, List<string> roles)
        {
            var result = new IdentityResult();
            var newUserId = Program.GetGUID();

            var user = new User()
            {
                Id = newUserId,
                Email = newUser.Email,
                UserName = newUser.UserName,
            };

            var emailCheck = await _userManager.FindByEmailAsync(user.Email);
            if (emailCheck != null)
            {
                throw new Exception("User already exists!");
            }

            result = await _userManager.CreateAsync(user, newUser.Password);

            if (!result.Succeeded)
                throw new Exception(string.Join("\n", result.Errors.Select(x => x.Description)));

            foreach (var role in roles)
                await _userManager.AddToRoleAsync(user, role);
        }
    }
}

using API.Entities;
using API.Interfaces.Managers;
using API.Models.Input;
using API.Models.Output;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata.Ecma335;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly IUserProfileImageManager _profileImageManager;

        public UserController(UserManager<User> userManager, IUserProfileImageManager userProfileImageManager)
        {
            _userManager = userManager;
            _profileImageManager = userProfileImageManager;
        }

        [HttpPost("picture/upload")]
        public async Task<IActionResult> UploadProfilePicture([FromBody] ProfileImageCreateModel toCreate)
        {
            try
            {
                var user = await _userManager.FindByIdAsync(toCreate.UserId);
                if (user == null)
                {
                    return NotFound("User was not found!");
                }

                var image = new UserProfileImage()
                {
                    Id = Program.GetGUID(),
                    UserId = toCreate.UserId,
                    ImageMnemonic = toCreate.ImageMnemonic,
                    Data = Convert.FromBase64String(toCreate.Data)
                };

                await _profileImageManager.Create(image);
                await _userManager.UpdateAsync(user);
                return Ok("Profile picture updated!");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("picture/data/{id}")]
        public async Task<IActionResult> GetProfilePicture([FromRoute] string id)
        {
            try
            {
                var user = await _userManager.FindByIdAsync(id);
                if (user == null)
                {
                    return NotFound("User was not found!");
                }

                var image = await _profileImageManager.GetByUserId(user.Id);
                var dataUrl = $"data:{image.ImageMnemonic};base64,{Convert.ToBase64String(image.Data)}";
                return Ok(dataUrl);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("username")]
        public async Task<IActionResult> GetUserByUsername([FromBody] string username)
        {
            try
            {
                var user = await _userManager.FindByNameAsync(username);
                return Ok(user);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [Authorize(Policy = "Admin")]
        [HttpGet("{email}")]
        public async Task<IActionResult> GetUserByEmail([FromRoute] string email)
        {
            if (email == null || string.IsNullOrEmpty(email))
            {
                return BadRequest("Bad email!");
            }

            var result = await _userManager.FindByEmailAsync(email);

            if (result == null)
            {
                // If user is not found, return a NotFound response with an appropriate message
                return NotFound("User not found");
            }

            // If user is found, return the user object
            return Ok(result);
        }

        [Authorize(Policy = "Admin")]
        [HttpGet("all")]
        public async Task<List<User>> GetAll()
        {
            return await _userManager.Users.ToListAsync();
        }

        [Authorize(Policy = "Admin")]
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteUser([FromRoute] string id)
        {
            User? user = await _userManager.FindByIdAsync(id);

            if (user == null)
                return BadRequest("User not found");

            // Attempt to delete the user
            IdentityResult result = await _userManager.DeleteAsync(user);
            if (result == null)
                return BadRequest("Cannot delete user");

            return Ok("User successfully deleted");
        }

        [Authorize(Policy = "Admin")]
        [HttpDelete("delete/all")]
        public async Task<IActionResult> DeleteUsers()
        {
            // Attempt to delete the user
            List<User> users = await _userManager.Users.ToListAsync();
            IdentityResult result = new();
            foreach (User user in users)
            {
                if (user.UserName == "admin" || user.UserName == "sysadmin")
                    continue;
                result = await _userManager.DeleteAsync(user);
            }
            if (result == null)
                return BadRequest("Cannot delete user");

            return Ok("User successfully deleted");
        }
    }
}

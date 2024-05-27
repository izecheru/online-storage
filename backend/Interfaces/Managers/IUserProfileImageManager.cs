using API.Entities;
using API.Models.Input;
using API.Models.Output;

namespace API.Interfaces.Managers
{
    public interface IUserProfileImageManager
    {
        Task Create(UserProfileImage toCreate);
        Task Delete(string id);
        Task Update(UserProfileImage file);
        Task<UserProfileImage> Get(string id);
        Task<UserProfileImage> GetByUserId(string userId);
    }
}

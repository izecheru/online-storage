using API.Entities;
using API.Interfaces.Managers;
using API.Interfaces.Repositories;
using API.Models.Input;

namespace API.Managers
{
    public class UserProfileImageManager : IUserProfileImageManager
    {
        private readonly IUserProfileImageRepository _userProfileImageRepository;
        public UserProfileImageManager(IUserProfileImageRepository userProfileImageRepository)
        {
            _userProfileImageRepository = userProfileImageRepository;
        }

        public async Task Create(UserProfileImage toCreate)
        {
            await _userProfileImageRepository.Create(toCreate);
        }

        public Task Delete(string id)
        {
            throw new NotImplementedException();
        }

        public Task<UserProfileImage> Get(string id)
        {
            throw new NotImplementedException();
        }

        public async Task<UserProfileImage> GetByUserId(string userId)
        {
            var file = await _userProfileImageRepository.GetByUserId(userId);
            return file;
        }

        public Task Update(UserProfileImage file)
        {
            throw new NotImplementedException();
        }
    }
}

using API.Entities;

namespace API.Interfaces.Repositories
{
    public interface IUserProfileImageRepository : IRepositoryBase<UserProfileImage>
    {
        public Task<UserProfileImage> Get(string id);
        public Task<UserProfileImage> GetByUserId(string userId);
    }
}

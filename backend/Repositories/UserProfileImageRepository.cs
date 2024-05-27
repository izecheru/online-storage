using API.Data;
using API.Entities;
using API.Interfaces.Managers;
using API.Interfaces.Repositories;
using API.Specifications.ProfileImage;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories
{
    public class UserProfileImageRepository : RepositoryBase<UserProfileImage>, IUserProfileImageRepository
    {
        public UserProfileImageRepository(AppDbContext context) : base(context)
            => _entitySet = context.ProfileImages;
        public async Task<UserProfileImage> Get(string id)
            => await ApplySpecification(new ProfileImageByIdSpecification(id)).FirstAsync();
        public async Task<UserProfileImage> GetByUserId(string userId)
            => await ApplySpecification(new ProfileImageByUserIdSpecification(userId)).FirstAsync();
    }
}

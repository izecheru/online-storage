using API.Entities;
using API.Models.Output;

namespace API.Specifications.ProfileImage
{
    public class ProfileImageByUserIdSpecification : Specification<UserProfileImage>
    {
        public ProfileImageByUserIdSpecification(string userId) : base(file => file.UserId == userId)
        {

        }
    }
}

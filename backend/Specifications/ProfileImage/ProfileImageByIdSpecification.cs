using API.Entities;

namespace API.Specifications.ProfileImage
{
    public class ProfileImageByIdSpecification : Specification<UserProfileImage>
    {
        public ProfileImageByIdSpecification(string id) : base(image => image.Id == id)
        {

        }
    }
}

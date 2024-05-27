using API.Entities;
using Directory = API.Entities.Directory;
namespace API.Specifications.DirSpecification
{
    public class DirectoriesFromParentIdSpecification : Specification<Directory>
    {
        public DirectoriesFromParentIdSpecification(string parentId) : base(dir => dir.ParentId == parentId)
        {

        }
    }
}

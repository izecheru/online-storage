using API.Entities;

namespace API.Specifications.StorageFileSpecification
{
    public class DirsOnRootByUserIdSpecification : Specification<Entities.Directory>
    {
        public DirsOnRootByUserIdSpecification(string id) : base(dir => dir.ParentId == null && dir.UserId == id) { }
    }
}

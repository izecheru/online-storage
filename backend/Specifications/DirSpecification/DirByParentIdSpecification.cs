using API.Entities;

namespace API.Specifications.StorageFileSpecification
{
    public class DirByParentIdSpecification : Specification<Entities.Directory>
    {
        public DirByParentIdSpecification(string selectedFolderId) : base(dir => dir.ParentId == selectedFolderId)
        {

        }
    }
}

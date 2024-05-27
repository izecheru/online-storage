using API.Entities;
using Directory = API.Entities.Directory;

namespace API.Specifications.StorageFileSpecification
{
    public class DirByIdSpecification : Specification<Directory>
    {
        public DirByIdSpecification(string dirId) : base(dir => dir.Id == dirId) { }
    }
}

using File = API.Entities.File;
namespace API.Specifications.FileSpecification
{
    public class FileByDirectoryIdSpecification : Specification<File>
    {
        public FileByDirectoryIdSpecification(string dirId) : base(file => file.DirectoryId == dirId)
        {

        }
    }
}

using API.Entities;

namespace API.Specifications.FileSpecification
{
    public class FileDataByFileIdSpecification : Specification<FileData>
    {
        public FileDataByFileIdSpecification(string id) : base(file => file.FileId == id)
        {

        }
    }
}

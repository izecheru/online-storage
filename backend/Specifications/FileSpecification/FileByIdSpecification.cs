using API.Entities;
using File = API.Entities.File;

namespace API.Specifications.FileSpecification
{
    public class FileByIdSpecification : Specification<File>
    {
        public FileByIdSpecification(string id) : base(file => file.Id == id)
        {

        }
    }
}

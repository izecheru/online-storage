using API.Entities;
using File = API.Entities.File;

namespace API.Models.Output
{
    public class PaginatedFiles
    {
        public IEnumerable<FileModel> Files { get; set; }
        public Pagination Pagination { get; set; }
    }
}

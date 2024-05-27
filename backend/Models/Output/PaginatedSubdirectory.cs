using API.Entities;
using Directory = API.Entities.Directory;

namespace API.Models.Output
{
    public class PaginatedSubdirectory
    {
        public int CountFiles { get; set; }
        public int CountDirectories { get; set; }
        public Pagination Pagination { get; set; }
        public IEnumerable<FileModel> Files { get; set; }
        public IEnumerable<Directory> Directories { get; set; }
    }
}

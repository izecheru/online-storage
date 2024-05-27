using Directory = API.Entities.Directory;
namespace API.Models.Output
{
    public class PaginatedDirectories
    {
        public IEnumerable<Directory> Directories { get; set; }
        public Pagination Pagination { get; set; }
    }
}

using API.Entities;

namespace API.Models.Input
{
    public class FileCreateModel
    {
        public string DirectoryId { get; set; }
        public bool? CanMove { get; set; }
        public bool? CanDelete { get; set; }
        public long FileSize { get; set; }
        public DateTime? DateModified { get; set; }
        public List<string>? SharedWithOwnerIds { get; set; }
        public string Name { get; set; }
        public DateTime CreatedAt { get; set; }
        public FileTypeEnum FileType { get; set; }
        public string Data { get; set; }
        public string FileMnemonic { get; set; }
    }
}

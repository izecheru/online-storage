namespace API.Models.Input
{
    public class DirectoryCreateModel
    {

        public string? ParentId { get; set; }

        public bool CanMove { get; set; }

        public bool CanDelete { get; set; }

        public List<string>? SharedWithOwnerIds { get; set; }

        public string Name { get; set; }

        public string UserId { get; set; }
    }
}

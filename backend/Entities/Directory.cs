using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class Directory : Entity
    {
        [Key]
        public string Id { get; set; }

        public string? ParentId { get; set; }

        public bool CanMove { get; set; }

        public bool CanDelete { get; set; }

        public long? Size { get; set; }

        public DateTime? DateModified { get; set; }

        public List<string>? SharedWithOwnerIds { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public DateTime DateCreated { get; set; }

        [Required]
        public string UserId { get; set; }
        public virtual User User { get; set; }
        public virtual ICollection<File> Files { get; set; }
    }
}

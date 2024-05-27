using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class FileData : Entity
    {
        [Key]
        public string Id { get; set; }
        [Required]
        public string FileId { get; set; }
        public virtual File File { get; set; }
        [Required]
        public byte[] Data { get; set; }
        [Required]
        public string FileMnemonic { get; set; }
    }
}

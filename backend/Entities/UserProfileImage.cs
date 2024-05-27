using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class UserProfileImage : Entity
    {
        [Key]
        public string Id { get; set; }
        public string ImageMnemonic { get; set; }
        public byte[] Data { get; set; }
        [Required]
        public string UserId { get; set; }
        public virtual User User { get; set; }
    }
}

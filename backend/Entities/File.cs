using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace API.Entities
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum FileRights
    {
        Read = 0,
        Write = 1,
        Read_Write = 2
    }

    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum FileTypeEnum
    {
        PDF,
        EXE,
        JPG,
        JPEG,
        PNG,
        DOCX,
        RAR,
        ZIP
    }

    public class File : Entity
    {
        [Key]
        public string Id { get; set; }

        public bool? CanMove { get; set; }

        public bool? CanDelete { get; set; }

        [Required]
        public long FileSize { get; set; }

        public DateTime? DateModified { get; set; }

        public List<string>? SharedWithOwnerIds { get; set; }

        [Required]
        public string Name { get; set; }


        [Required]
        public DateTime DateCreated { get; set; }

        [Required]
        public FileTypeEnum FileType { get; set; }

        [Required]
        public string DirectoryId { get; set; }
    }
}

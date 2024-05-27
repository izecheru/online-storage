using API.Entities;
using System.ComponentModel.DataAnnotations;
using File = API.Entities.File;

namespace API.Models.Output
{
    public class FileModel
    {
        // i need the id for the deletion function
        public string Id { get; set; }

        public bool? CanMove { get; set; }

        public bool? CanDelete { get; set; }

        public long FileSize { get; set; }

        public DateTime? DateModified { get; set; }

        public List<string>? SharedWithOwnerIds { get; set; }

        public string Name { get; set; }

        public DateTime DateCreated { get; set; }

        [Required]
        public FileTypeEnum FileType { get; set; }

        public FileModel(File ob)
        {
            Id = ob.Id;
            CanMove = ob.CanMove;
            CanDelete = ob.CanDelete;
            FileSize = ob.FileSize;
            DateCreated = ob.DateCreated;
            DateModified = ob.DateModified;
            SharedWithOwnerIds = ob.SharedWithOwnerIds;
            Name = ob.Name;
            FileType = ob.FileType;
        }
    }
}

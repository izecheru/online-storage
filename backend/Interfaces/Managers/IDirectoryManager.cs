using API.Models.Input;
using Directory = API.Entities.Directory;

namespace API.Interfaces.Managers
{
    public interface IDirectoryManager
    {
        Task Create(DirectoryCreateModel toCreate);
        Task Delete(string id);
        Task<Directory> Get(string id);
        Task Update(Directory directory);
        Task<List<Directory>> GetDirectoriesOnRootByOwnerId(string ownerId);
        Task<List<Directory>> GetDirectoriesFromParentId(string parentId);
    }
}

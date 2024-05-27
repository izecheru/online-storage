using API.Entities;
using Directory = API.Entities.Directory;

namespace API.Interfaces.Repositories
{
    public interface IDirectoryRepository : IRepositoryBase<Directory>
    {
        public Task<Directory> Get(string id);

        public Task<List<Directory>> GetDirectoryByParentId(string parentId);

        public Task<List<Directory>> GetDirectoriesOnRootByOwnerId(string ownerId);
        public Task<List<Directory>> GetDirectoriesFromParentId(string parentId);
    }

}

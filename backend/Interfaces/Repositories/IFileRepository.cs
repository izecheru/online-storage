using File = API.Entities.File;

namespace API.Interfaces.Repositories
{
    public interface IFileRepository : IRepositoryBase<File>
    {
        public Task<File> Get(string id);
        public Task<List<File>> GetByDirectoryId(string directoryId);
    }
}

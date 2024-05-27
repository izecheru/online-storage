using API.Entities;
using API.Models.Output;

namespace API.Interfaces.Repositories
{
    public interface IFileDataRepository : IRepositoryBase<FileData>
    {
        Task<FileData> Get(string fileId);
    }
}

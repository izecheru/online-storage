using API.Entities;
using API.Models.Output;

namespace API.Interfaces.Managers
{
    public interface IFileDataManager
    {
        Task Create(FileData toCreate);
        Task Delete(string fileId);
        Task Update(FileData fileToUpdate);
        Task<FileData> Get(string fileId);
    }
}

using API.Models.Input;
using API.Models.Output;
using File = API.Entities.File;

namespace API.Interfaces.Managers
{
    public interface IFileManager
    {
        Task<string> Create(FileCreateModel toCreate);
        Task Delete(string id);
        Task Update(File file);
        Task<List<FileModel>> GetFilesByDirectoryId(string directoryId);
        Task<File> Get(string id);
    }
}

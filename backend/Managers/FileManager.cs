using API.Interfaces.Managers;
using API.Interfaces.Repositories;
using API.Models.Input;
using API.Models.Output;
using File = API.Entities.File;


namespace API.Managers
{
    public class FileManager : IFileManager
    {
        private readonly IFileRepository _fileRepository;
        public FileManager(IFileRepository fileRepository)
        {
            _fileRepository = fileRepository;
        }

        public async Task<string> Create(FileCreateModel toCreate)
        {
            var fileId = Program.GetGUID();
            var file = new File()
            {
                Id = fileId,
                CanMove = toCreate.CanMove,
                CanDelete = toCreate.CanDelete,
                FileSize = toCreate.FileSize,
                DateModified = DateTime.Now,
                SharedWithOwnerIds = toCreate.SharedWithOwnerIds,
                Name = toCreate.Name,
                DateCreated = DateTime.Now,
                DirectoryId = toCreate.DirectoryId,
                FileType = toCreate.FileType,
            };
            await _fileRepository.Create(file);
            return fileId;
        }

        public async Task Delete(string fileId)
        {
            var file = await _fileRepository.Get(fileId) ?? throw new KeyNotFoundException();
            await _fileRepository.Delete(file);
        }

        public async Task<List<FileModel>> GetFilesByDirectoryId(string directoryId)
        {
            var files = await _fileRepository.GetByDirectoryId(directoryId);
            return files.Select(file => new FileModel(file)).OrderBy(x => x.FileSize).ToList();
        }

        public async Task<File> Get(string id)
        {
            var file = await _fileRepository.Get(id);
            return file;
        }

        public async Task Update(File file)
        {
            await _fileRepository.Update(file);
        }
    }
}

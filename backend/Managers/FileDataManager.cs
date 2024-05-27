using API.Entities;
using API.Interfaces.Managers;
using API.Interfaces.Repositories;
using API.Models.Output;

namespace API.Managers
{
    public class FileDataManager : IFileDataManager
    {
        private readonly IFileDataRepository _fileDataRepository;

        public FileDataManager(IFileDataRepository fileDataRepository)
        {
            _fileDataRepository = fileDataRepository;
        }

        public async Task Create(FileData toCreate)
        {
            await _fileDataRepository.Create(toCreate);
        }

        public async Task Delete(string fileId)
        {
            var fileToDelete = await _fileDataRepository.Get(fileId);
            await _fileDataRepository.Delete(fileToDelete);
        }

        public async Task<FileData> Get(string fileId)
        {
            var file = await _fileDataRepository.Get(fileId);
            return file;
        }

        public async Task Update(FileData fileForUpdate)
        {
            await _fileDataRepository.Update(fileForUpdate);
        }
    }
}

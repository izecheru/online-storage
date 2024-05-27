using API.Entities;
using API.Interfaces.Managers;
using API.Interfaces.Repositories;
using API.Models.Input;
using Microsoft.AspNetCore.Identity;
using Directory = API.Entities.Directory;

namespace API.Managers
{
    public class DirectoryManager : IDirectoryManager
    {
        private readonly UserManager<User> _userManager;
        private readonly IDirectoryRepository _directoryRepository;

        public DirectoryManager(UserManager<User> userManager, IDirectoryRepository directoryRepository)
        {
            _userManager = userManager;
            _directoryRepository = directoryRepository;
        }

        public async Task Create(DirectoryCreateModel toCreate)
        {
            var user = await _userManager.FindByIdAsync(toCreate.UserId);
            if (user == null)
            {
                throw new Exception("User was not found!");
            }
            // TODO add a path thing so that all i enter is the folder name and maybe
            // in the request to get the remaining path or something
            // or create an entire special endpoint for creating root folders
            // to do something like /root/+editFolderName(toCreate.name);
            var dir = new Directory()
            {
                Id = Program.GetGUID(),
                CanDelete = toCreate.CanDelete,
                CanMove = toCreate.CanMove,
                Name = toCreate.Name,
                ParentId = toCreate.ParentId,
                UserId = toCreate.UserId,
                DateCreated = DateTime.Now,
                SharedWithOwnerIds = toCreate.SharedWithOwnerIds,
                DateModified = DateTime.Now
            };
            await _directoryRepository.Create(dir);
        }


        public async Task Delete(string id)
        {
            var directory = await _directoryRepository.Get(id) ?? throw new KeyNotFoundException();
            if (directory.CanDelete == false)
            {
                throw new Exception("Dir cannot be deleted!");
            }
            await _directoryRepository.Delete(directory);
        }

        public async Task<Directory> Get(string id)
        {
            var dir = await _directoryRepository.Get(id) ?? throw new KeyNotFoundException();
            return dir;
        }

        public async Task<List<Directory>> GetDirectoriesFromParentId(string parentId)
        {
            var directories = await _directoryRepository.GetDirectoriesFromParentId(parentId) ?? throw new KeyNotFoundException();

            return directories;
        }

        public async Task<List<Directory>> GetDirectoriesOnRootByOwnerId(string ownerId)
        {
            var directories = await _directoryRepository.GetDirectoriesOnRootByOwnerId(ownerId) ?? throw new KeyNotFoundException();
            return directories;
        }

        public async Task Update(Directory directory)
        {
            await _directoryRepository.Update(directory);
        }
    }
}

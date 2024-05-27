using API.Data;
using API.Entities;
using API.Interfaces.Repositories;
using API.Specifications.DirSpecification;
using API.Specifications.StorageFileSpecification;
using Microsoft.EntityFrameworkCore;
using Directory = API.Entities.Directory;

namespace API.Repositories
{
    public class DirectoryRepository : RepositoryBase<Directory>, IDirectoryRepository
    {
        public DirectoryRepository(AppDbContext context) : base(context)
            => _entitySet = _context.Directories;

        public async Task<Directory> Get(string id)
            => await ApplySpecification(new DirByIdSpecification(id)).FirstAsync();

        public async Task<List<Directory>> GetDirectoryByParentId(string parentId)
            => await ApplySpecification(new DirByParentIdSpecification(parentId)).ToListAsync();

        public async Task<List<Directory>> GetDirectoriesOnRootByOwnerId(string ownerId)
            => await ApplySpecification(new DirsOnRootByUserIdSpecification(ownerId)).ToListAsync();

        public async Task<List<Directory>> GetDirectoriesFromParentId(string parentId)
            => await ApplySpecification(new DirectoriesFromParentIdSpecification(parentId)).ToListAsync();
    }
}

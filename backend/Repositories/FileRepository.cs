using API.Data;
using API.Interfaces.Repositories;
using API.Specifications.FileSpecification;
using Microsoft.EntityFrameworkCore;
using File = API.Entities.File;
namespace API.Repositories
{
    public class FileRepository : RepositoryBase<File>, IFileRepository
    {
        public FileRepository(AppDbContext context) : base(context)
            => _entitySet = context.Files;

        public async Task<File> Get(string id)
            => await ApplySpecification(new FileByIdSpecification(id)).FirstAsync();

        public async Task<List<File>> GetByDirectoryId(string directoryId)
            => await ApplySpecification(new FileByDirectoryIdSpecification(directoryId)).ToListAsync();
    }
}

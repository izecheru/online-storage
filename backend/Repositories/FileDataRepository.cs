using API.Data;
using API.Entities;
using API.Interfaces.Repositories;
using API.Models.Output;
using API.Specifications.FileSpecification;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories
{
    public class FileDataRepository : RepositoryBase<FileData>, IFileDataRepository
    {
        public FileDataRepository(AppDbContext context) : base(context)
        => _entitySet = context.FilesData;

        public async Task<FileData> Get(string fileId)
            => await ApplySpecification(new FileDataByFileIdSpecification(fileId)).FirstAsync();

    }
}

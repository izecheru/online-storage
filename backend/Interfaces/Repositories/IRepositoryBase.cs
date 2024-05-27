using API.Entities;

namespace API.Interfaces.Repositories
{
    public interface IRepositoryBase<T> where T : Entity
    {
        Task<List<T>> GetAll();
        Task Create(T toCreate);
        Task Update(T toUpdate);
        Task Delete(T toDelete);
    }
}


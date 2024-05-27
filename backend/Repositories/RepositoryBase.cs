using API.Data;
using API.Entities;
using API.Interfaces.Repositories;
using API.Specifications;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories
{
    public class RepositoryBase<EntityType> : IRepositoryBase<EntityType> where EntityType : Entity
    {

        protected readonly AppDbContext _context;
        protected DbSet<EntityType> _entitySet = null;

        public RepositoryBase(AppDbContext context)
            => _context = context;

        protected async Task SaveAsync() => await _context.SaveChangesAsync();

        public virtual async Task Create(EntityType toCreate)
        {
            if (_entitySet == null)
                throw new System.Exception("entity set is not initialised");

            await _entitySet.AddAsync(toCreate);
            await SaveAsync();
        }

        public virtual async Task Delete(EntityType toDelete)
        {
            if (_entitySet == null)
                throw new System.Exception("entity set is not initialised");

            await Task.FromResult(_entitySet.Remove(toDelete));
            await SaveAsync();
        }

        public virtual async Task<List<EntityType>> GetAll()
        {
            if (_entitySet == null)
                throw new System.Exception("entity set is not initialised");
            var obj = await _entitySet.ToListAsync();
            return obj;
        }

        public virtual async Task Update(EntityType toUpdate)
        {
            if (_entitySet == null)
                throw new System.Exception("entity set is not initialised");

            await Task.FromResult(_entitySet.Update(toUpdate));
            await SaveAsync();
        }

        protected IQueryable<EntityType> ApplySpecification(Specification<EntityType> specification)
        {
            if (_entitySet == null)
                throw new System.Exception("The entity set was not initialised!");

            return SpecificationEvaluator.GetQuery(_entitySet, specification);
        }

        /// <summary>
        /// Used to apply a specification on a queryable
        /// </summary>
        protected IQueryable<EntityType> ApplySpecification(IQueryable<EntityType> queryable, Specification<EntityType> specification)
        {
            return SpecificationEvaluator.GetQuery(queryable, specification);
        }

    }
}

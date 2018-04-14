using BlogProgramistyczny.Entites;
using BlogProgramistyczny.Helpers.Paginate;
using System.Collections.Generic;

namespace BlogProgramistyczny.Repository.Interface
{
    public interface ICategoryRepository : IRepository<Category>
    {
        IEnumerable<Category> ListByPaginatedParameters(Parameters parameters);
        int Count();
    }
}

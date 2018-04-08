using BlogProgramistyczny.Entites;
using BlogProgramistyczny.Helpers.Paginate;
using System.Collections.Generic;

namespace BlogProgramistyczny.Repository.Interface
{
    public interface IProfileRepository : IRepository<Profil>
    {
        IEnumerable<Profil> ListByPaginatedParameters(Parameters parameters);
        int Count();
    }
}

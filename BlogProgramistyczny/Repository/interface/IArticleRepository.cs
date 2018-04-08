using BlogProgramistyczny.Entites;
using BlogProgramistyczny.Helpers.Paginate;
using System.Collections.Generic;

namespace BlogProgramistyczny.Repository.Interface
{
    public interface IArticleRepository : IRepository<Article>
    {
        Article GetByUrl(string url);
        Article GetFirst();
        IEnumerable<Article> ListByPaginatedParameters(Parameters parameters);
        int Count();
    }
}

using BlogProgramistyczny.Entites;
using BlogProgramistyczny.Helpers.Paginate;
using System.Collections.Generic;

namespace BlogProgramistyczny.Repository.Interface
{
    public interface ICommentRepository : IRepository<ArticleComment>
    {
        IEnumerable<ArticleComment> ListByPaginatedParameters(Parameters parameters);
        int Count();
    }
}

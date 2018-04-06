using BlogProgramistyczny.Entites;
using BlogProgramistyczny.ModelView.Article;

namespace BlogProgramistyczny.Repository.Interface
{
    public interface IArticleRepository : IRepository<Article>
    {
        Article Get(string url);
    }
}

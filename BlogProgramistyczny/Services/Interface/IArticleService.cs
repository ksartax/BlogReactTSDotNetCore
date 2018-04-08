using BlogProgramistyczny.ModelView.Article;

namespace BlogProgramistyczny.Services.Interface
{
    public interface IArticleService : IService<ArticleView, ArticleCreate, ArticleUpdate>
    {
        ArticleView GetNewArticle();
        ArticleView GetByUrl(string url);
    }
}

using BlogProgramistyczny.ModelView.Article;
using System.Collections.Generic;

namespace BlogProgramistyczny.Services.Interface
{
    public interface IArticleService : IService<ArticleView, ArticleCreate, ArticleUpdate>
    {
        ArticleView GetNewArticle();
        ArticleView GetByUrl(string url);
        IEnumerable<ArticleView> SearchedList(string s);
    }
}

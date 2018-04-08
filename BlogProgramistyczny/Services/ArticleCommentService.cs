using BlogProgramistyczny.Entites;
using BlogProgramistyczny.Services.Interface;
using BlogProgramistyczny.Repository.Interface;
using System.Collections.Generic;
using System.Linq;
using BlogProgramistyczny.ModelView.ArticleComment;
using System;

namespace BlogProgramistyczny.Services
{
    public class ArticleCommentService : IArticleCommentService
    {
        private readonly IArticleRepository _articleRepository;

        public ArticleCommentService(IArticleRepository articleRepository)
        {
            _articleRepository = articleRepository;
        }

        public bool Add(int id, ArticleCommentCreate articleCommentCreate)
        {
            var article = _articleRepository.Get(id);
            if (article == null)
            {
                throw new Exception("Błąd, brak artykułó");
            }

            article.Comments.Add(new ArticleComment(articleCommentCreate));

            return !_articleRepository.Update(article);
        }

        public ICollection<ArticleCommentView> Get(int id)
        {
            var article = this._articleRepository.Get(id);
            if (article == null)
            {
                throw new Exception("Błąd, brak artykułó");
            }

            var comments = new List<ArticleCommentView>();
            article.Comments?.Where(c => c.ArticleCommentId == 0).ToList().ForEach(c =>
            {
                comments.Add(new ArticleCommentView(c));
            });

            return comments;
        }
    }
}

using BlogProgramistyczny.Context;
using BlogProgramistyczny.Entites;
using BlogProgramistyczny.Repository.Interface;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace BlogProgramistyczny.Repository
{
    public class CommentRepository : ICommentRepository
    {
        public readonly ApplicationContext _applicationContext;

        public CommentRepository(ApplicationContext applicationContext)
        {
            this._applicationContext = applicationContext;
        }

        public ArticleComment Get(int id)
        {
            return this._applicationContext.ArticleComments
                .Include(a => a.Article)
                .Include(a => a.Comments)
                .Where(p => p.Id == id)
                .FirstOrDefault();
        }

        public IEnumerable<ArticleComment> List()
        {
            return this._applicationContext.ArticleComments
                .Include(a => a.Article)
                .Include(a => a.Comments);
        }

        public bool Save(ArticleComment value)
        {
            this._applicationContext.ArticleComments.Add(value);

            return (this._applicationContext.SaveChanges() >= 0);
        }

        public bool Update(ArticleComment value)
        {
            this._applicationContext.ArticleComments.Update(value);

            return (this._applicationContext.SaveChanges() >= 0);
        }

        public bool Delete(ArticleComment value)
        {
            this._applicationContext.ArticleComments.Remove(value);

            return (this._applicationContext.SaveChanges() >= 0);
        }

        public bool Delete(int id)
        {
            var articleComments = this.Get(id);
            if (articleComments == null)
            {
                throw new Exception("Błąd podczas usówania, brak elementu o id : " + id);
            }

            return this.Delete(articleComments);
        }
    }
}

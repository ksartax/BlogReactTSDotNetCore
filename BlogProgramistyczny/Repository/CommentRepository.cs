using BlogProgramistyczny.Context;
using BlogProgramistyczny.Entites;
using BlogProgramistyczny.Helpers.Paginate;
using BlogProgramistyczny.Repository.Interface;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace BlogProgramistyczny.Repository
{
    public class CommentRepository : ICommentRepository
    {
        private readonly ApplicationContext _applicationContext;

        public CommentRepository(ApplicationContext applicationContext)
        {
            _applicationContext = applicationContext;
        }

        public ArticleComment Get(int id)
        {
            return _applicationContext.ArticleComments
                .Include(a => a.Article)
                    .ThenInclude(a => a.Categories)
                        .ThenInclude(a => a.Category)
                .Include(a => a.Comments)
                .Where(p => p.Id == id)
                .FirstOrDefault();
        }

        public IEnumerable<ArticleComment> List()
        {
            return _applicationContext.ArticleComments
                .Include(a => a.Article)
                    .ThenInclude(a => a.Categories)
                        .ThenInclude(a => a.Category)
                .Include(a => a.Comments)
                .ToList();
        }

        public IEnumerable<ArticleComment> ListByPaginatedParameters(Parameters parameters)
        {
            var query = _applicationContext.ArticleComments
                .Include(a => a.Article)
                    .ThenInclude(a => a.Categories)
                        .ThenInclude(a => a.Category)
                .Include(a => a.Comments)
                .Where(c => c.ArticleCommentId == 0)
                .AsQueryable();

            if (parameters.Sort != null)
            {
                switch (parameters.Sort)
                {
                    case "DESC":
                        query = query.OrderByDescending(a => a.CreatedAt);
                        break;
                    case "ASC":
                        query = query.OrderBy(a => a.CreatedAt);
                        break;
                    default:
                        break;
                }
            }

            return query.Skip(
                (parameters.Index - 1) * parameters.Size)
                .Take(parameters.Size)
                .ToList();
        }

        public bool Save(ArticleComment value)
        {
            _applicationContext.ArticleComments.Add(value);

            return (_applicationContext.SaveChanges() >= 0);
        }

        public bool Update(ArticleComment value)
        {
            _applicationContext.ArticleComments.Update(value);

            return (_applicationContext.SaveChanges() >= 0);
        }

        public bool Delete(ArticleComment value)
        {
            _applicationContext.ArticleComments.Remove(value);

            return (_applicationContext.SaveChanges() >= 0);
        }

        public bool Delete(int id)
        {
            var articleComments = Get(id);
            if (articleComments == null)
            {
                throw new Exception("Błąd podczas usówania, brak elementu o id : " + id);
            }

            return Delete(articleComments);
        }

        public int Count()
        {
            return _applicationContext.ArticleComments.Count();
        }
    }
}

using BlogProgramistyczny.Context;
using BlogProgramistyczny.Entites;
using System;
using System.Collections.Generic;
using BlogProgramistyczny.Repository.Interface;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using BlogProgramistyczny.Helpers.Paginate;

namespace BlogProgramistyczny.Repository
{
    public class ArticleRepository : IArticleRepository
    {
        private readonly ApplicationContext _applicationContext;

        public ArticleRepository(ApplicationContext applicationContext)
        {
            _applicationContext = applicationContext;
        }

        public Article Get(int id)
        {
            return _applicationContext.Articles
                .Include(a => a.Comments)
                .Include(a => a.Images)
                    .ThenInclude(i => i.Image)
                .Where(p => p.Id == id)
                .FirstOrDefault();
        }

        public Article GetByUrl(string url)
        {
            return _applicationContext.Articles
                .Include(a => a.Comments)
                .Include(a => a.Images)
                    .ThenInclude(i => i.Image)
                .Where(a => a.Url.Contains(url))
                .FirstOrDefault();
        }

        public Article GetFirst()
        {
            return _applicationContext.Articles
                .Include(a => a.Comments)
                .Include(a => a.Images)
                    .ThenInclude(i => i.Image)
                .OrderByDescending(a => a.CreatedAt)
                .FirstOrDefault();
        }

        public IEnumerable<Article> List()
        {
            return _applicationContext.Articles
                .Include(a => a.Comments)
                .Include(a => a.Images)
                    .ThenInclude(i => i.Image)
                .ToList();
        }

        public IEnumerable<Article> ListByPaginatedParameters(Parameters parameters)
        {
            var query = _applicationContext.Articles
                .Include(a => a.Comments)
                .Include(a => a.Images)
                    .ThenInclude(i => i.Image)
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

        public bool Save(Article value)
        {
            _applicationContext.Articles.Add(value);

            return (_applicationContext.SaveChanges() >= 0);
        }

        public bool Update(Article value)
        {
            _applicationContext.Articles.Update(value);

            return (_applicationContext.SaveChanges() >= 0);
        }

        public bool Delete(Article value)
        {
            _applicationContext.Articles.Remove(value);
            
            return (_applicationContext.SaveChanges() >= 0);
        }

        public bool Delete(int id)
        {
            var article = Get(id);
            if (article == null)
            {
                throw new Exception("Błąd podczas usówania, brak elementu o id : " + id);
            }

            return Delete(article);
        }

        public int Count()
        {
            return _applicationContext.Articles.Count();
        }
    }
}

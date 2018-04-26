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

        private IQueryable<Article> GetQueryable()
        {
            return _applicationContext.Articles
                .Include(a => a.Comments)
                .Include(a => a.Images)
                    .ThenInclude(i => i.Image)
                .Include(a => a.Categories)
                    .ThenInclude(i => i.Category);
        }

        public Article Get(int id)
        {
            return GetQueryable()
                .Where(p => p.Id == id)
                .FirstOrDefault();
        }

        public Article GetByUrl(string url)
        {
            return GetQueryable()
                .Where(a => a.Url.Contains(url))
                .FirstOrDefault();
        }

        public Article GetFirst()
        {
            return GetQueryable()
                .OrderByDescending(a => a.CreatedAt)
                .FirstOrDefault();
        }

        public IEnumerable<Article> List()
        {
            return GetQueryable()
                .ToList();
        }

        public IEnumerable<Article> ListByPaginatedParameters(Parameters parameters)
        {
            var query = GetQueryable();

            if (parameters.SearchCategory != null && !parameters.SearchCategory.Equals(""))
            {
                query = query
                    .Where(category => category.Categories.Any(c => c.Category.UrlTitle.Equals(parameters.SearchCategory)));
            }

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

        public int Count(Parameters parameters)
        {
            if (parameters.SearchCategory != null && !parameters.SearchCategory.Equals(""))
            {
                return _applicationContext.Articles
                    .Include(category => category.Categories)
                    .Where(category => category.Categories.Any(c => c.Category.UrlTitle.Equals(parameters.SearchCategory))).Count();
            }

            return _applicationContext.Articles.Count();
        }

        public IEnumerable<Article> SearchArticles(string s)
        {
            return _applicationContext.Articles
                .Include(a => a.Images)
                    .ThenInclude(i => i.Image)
                .Where(a => a.Url.Contains(s) || a.Title.Contains(s));
        }
    }
}

using BlogProgramistyczny.Context;
using BlogProgramistyczny.Entites;
using System;
using System.Collections.Generic;
using BlogProgramistyczny.Repository.Interface;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace BlogProgramistyczny.Repository
{
    public class ArticleRepository : IArticleRepository
    {
        public readonly ApplicationContext _applicationContext;

        public ArticleRepository(ApplicationContext applicationContext)
        {
            this._applicationContext = applicationContext;
        }

        public Article Get(int id)
        {
            return this._applicationContext.Articles
                .Include(a => a.Comments)
                .Include(a => a.Images)
                    .ThenInclude(i => i.Image)
                .Where(p => p.Id == id)
                .FirstOrDefault();
        }

        public Article Get(string url)
        {
            return this._applicationContext.Articles
                .Include(a => a.Comments)
                .Include(a => a.Images)
                    .ThenInclude(i => i.Image)
                .Where(p => p.Url.Contains(url))
                .FirstOrDefault();
        }

        public IEnumerable<Article> List()
        {
            return this._applicationContext.Articles
                .Include(a => a.Comments)
                .Include(a => a.Images)
                    .ThenInclude(i => i.Image);
        }

        public bool Save(Article value)
        {
            this._applicationContext.Articles.Add(value);

            return (this._applicationContext.SaveChanges() >= 0);
        }

        public bool Update(Article value)
        {
            this._applicationContext.Articles.Update(value);

            return (this._applicationContext.SaveChanges() >= 0);
        }

        public bool Delete(Article value)
        {
            this._applicationContext.Articles.Remove(value);
            
            return (this._applicationContext.SaveChanges() >= 0);
        }

        public bool Delete(int id)
        {
            var article = this.Get(id);
            if (article == null)
            {
                throw new Exception("Błąd podczas usówania, brak elementu o id : " + id);
            }

            return this.Delete(article);
        }
    }
}

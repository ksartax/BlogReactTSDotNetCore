using BlogProgramistyczny.Context;
using BlogProgramistyczny.Entites;
using System;
using System.Collections.Generic;
using BlogProgramistyczny.Repository.Interface;
using System.Linq;

namespace BlogProgramistyczny.Repository
{
    public class CategoryRepository : ICategoryRepository
    {
        public readonly ApplicationContext _applicationContext;

        public CategoryRepository(ApplicationContext applicationContext)
        {
            this._applicationContext = applicationContext;
        }

        public Category Get(int id)
        {
            return this._applicationContext.Categories.Where(p => p.Id == id).FirstOrDefault();
        }

        public IEnumerable<Category> List()
        {
            return this._applicationContext.Categories.ToArray();
        }

        public bool Save(Category value)
        {
            this._applicationContext.Categories.Add(value);

            return (this._applicationContext.SaveChanges() >= 0);
        }

        public bool Update(Category value)
        {
            this._applicationContext.Categories.Update(value);

            return (this._applicationContext.SaveChanges() >= 0);
        }

        public bool Delete(Category value)
        {
            this._applicationContext.Categories.Remove(value);
            
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

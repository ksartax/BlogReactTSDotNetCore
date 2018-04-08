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
        private readonly ApplicationContext _applicationContext;

        public CategoryRepository(ApplicationContext applicationContext)
        {
            _applicationContext = applicationContext;
        }

        public Category Get(int id)
        {
            return _applicationContext.Categories.Where(p => p.Id == id).FirstOrDefault();
        }

        public IEnumerable<Category> List()
        {
            return _applicationContext.Categories.ToList();
        }

        public bool Save(Category value)
        {
            _applicationContext.Categories.Add(value);

            return (_applicationContext.SaveChanges() >= 0);
        }

        public bool Update(Category value)
        {
            _applicationContext.Categories.Update(value);

            return (_applicationContext.SaveChanges() >= 0);
        }

        public bool Delete(Category value)
        {
            _applicationContext.Categories.Remove(value);
            
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
    }
}

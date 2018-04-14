using System;
using BlogProgramistyczny.Services.Interface;
using BlogProgramistyczny.Repository.Interface;
using BlogProgramistyczny.Helpers.Paginate;
using BlogProgramistyczny.ModelView.Category;
using System.Linq;
using System.Collections.Generic;

namespace BlogProgramistyczny.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _categoryRepository;

        public CategoryService(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        public bool Delete(int id)
        {
            var category = _categoryRepository.Get(id);
            if (category == null)
            {
                throw new Exception("Błąd, brak kategorii");
            }

            return _categoryRepository.Delete(category);
        }

        public CategoryView Get(int id)
        {
            var category = _categoryRepository.Get(id);
            if (category == null)
            {
                throw new Exception("Błąd, brak kategorii");
            }

            return new CategoryView(category);
        }

        public PaginatedView<CategoryView> List(Parameters parameters)
        {
            var category = _categoryRepository.ListByPaginatedParameters(parameters).ToList();
            parameters.Count = _categoryRepository.Count();

            var categoryMapped = new List<CategoryView>();
            category.ForEach(a => {
                categoryMapped.Add(new CategoryView(a));
            });

            return new PaginatedView<CategoryView>(categoryMapped, parameters);
        }

        public bool Save(CategoryCreate value)
        {
            return _categoryRepository.Save(new Entites.Category(value)
            {
                CreatedAt = DateTime.Now,
                Level = 0,
                Status = 1
            });
        }

        public bool Update(int id, CategoryCreate value)
        {
            throw new NotImplementedException();
        }
    }
}

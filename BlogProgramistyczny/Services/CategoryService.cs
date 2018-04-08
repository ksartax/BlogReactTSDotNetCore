using System;
using BlogProgramistyczny.Services.Interface;
using BlogProgramistyczny.Repository.Interface;
using BlogProgramistyczny.Entites;
using BlogProgramistyczny.Helpers.Paginate;

namespace BlogProgramistyczny.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _categoryRepository;

        public CategoryService(ICategoryRepository categoryRepository)
        {
            this._categoryRepository = categoryRepository;
        }

        public bool Delete(int id)
        {
            throw new NotImplementedException();
        }

        public Category Get(int id)
        {
            throw new NotImplementedException();
        }

        public PaginatedView<Category> List(Parameters parameters)
        {
            throw new NotImplementedException();
        }

        public bool Save(Category value)
        {
            throw new NotImplementedException();
        }

        public bool Update(int id, Category value)
        {
            throw new NotImplementedException();
        }
    }
}

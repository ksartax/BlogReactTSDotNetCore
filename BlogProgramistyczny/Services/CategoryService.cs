using System;
using System.Collections.Generic;
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

        public PaginatedListMapped<Category> List(int pageIndex, int pageSize, string sort)
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

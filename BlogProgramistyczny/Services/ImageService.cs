using System;
using System.Collections.Generic;
using BlogProgramistyczny.Services.Interface;
using BlogProgramistyczny.Repository.Interface;
using BlogProgramistyczny.Entites;
using BlogProgramistyczny.Helpers.Paginate;

namespace BlogProgramistyczny.Services
{
    public class ImageService : IImageService
    {
        private readonly IImageRepository _imageRepository;

        public ImageService(IImageRepository imageRepository)
        {
            this._imageRepository = imageRepository;
        }

        public bool Delete(int id)
        {
            throw new NotImplementedException();
        }

        public Image Get(int id)
        {
            throw new NotImplementedException();
        }

        public PaginatedListMapped<Image> List(int pageIndex, int pageSize, string sort)
        {
            throw new NotImplementedException();
        }

        public bool Save(Image value)
        {
            throw new NotImplementedException();
        }

        public bool Update(int id, Image value)
        {
            throw new NotImplementedException();
        }
    }
}

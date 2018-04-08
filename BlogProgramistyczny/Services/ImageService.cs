using System;
using BlogProgramistyczny.Services.Interface;
using BlogProgramistyczny.Repository.Interface;
using BlogProgramistyczny.Helpers.Paginate;
using BlogProgramistyczny.ModelView.Image;

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

        public ImageView Get(int id)
        {
            throw new NotImplementedException();
        }

        public PaginatedView<ImageView> List(Parameters parameters)
        {
            throw new NotImplementedException();
        }

        public bool Save(ImageCreate value)
        {
            throw new NotImplementedException();
        }

        public bool Update(int id, ImageUpdate value)
        {
            throw new NotImplementedException();
        }
    }
}

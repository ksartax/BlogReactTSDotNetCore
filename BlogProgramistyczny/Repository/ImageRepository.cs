using BlogProgramistyczny.Context;
using BlogProgramistyczny.Entites;
using System;
using System.Collections.Generic;
using BlogProgramistyczny.Repository.Interface;
using System.Linq;

namespace BlogProgramistyczny.Repository
{
    public class ImageRepository : IImageRepository
    {
        private readonly ApplicationContext _applicationContext;

        public ImageRepository(ApplicationContext applicationContext)
        {
            _applicationContext = applicationContext;
        }

        public Image Get(int id)
        {
            return _applicationContext.Images
                .Where(p => p.Id == id)
                .FirstOrDefault();
        }

        public IEnumerable<Image> List()
        {
            return _applicationContext.Images
                .ToList();
        }

        public bool Save(Image value)
        {
            _applicationContext.Images.Add(value);

            return (_applicationContext.SaveChanges() >= 0);
        }

        public bool Update(Image value)
        {
            _applicationContext.Images.Update(value);

            return (_applicationContext.SaveChanges() >= 0);
        }

        public bool Delete(Image value)
        {
            _applicationContext.Images.Remove(value);
            
            return (_applicationContext.SaveChanges() >= 0);
        }

        public bool Delete(int id)
        {
            var image = Get(id);
            if (image == null)
            {
                throw new Exception("Błąd podczas usówania, brak elementu o id : " + id);
            }

            return Delete(image);
        }
    }
}

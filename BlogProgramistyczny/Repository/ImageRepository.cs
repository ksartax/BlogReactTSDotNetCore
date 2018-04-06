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
        public readonly ApplicationContext _applicationContext;

        public ImageRepository(ApplicationContext applicationContext)
        {
            this._applicationContext = applicationContext;
        }

        public Image Get(int id)
        {
            return this._applicationContext.Images.Where(p => p.Id == id).FirstOrDefault();
        }

        public IEnumerable<Image> List()
        {
            return this._applicationContext.Images.ToArray();
        }

        public bool Save(Image value)
        {
            this._applicationContext.Images.Add(value);

            return (this._applicationContext.SaveChanges() >= 0);
        }

        public bool Update(Image value)
        {
            this._applicationContext.Images.Update(value);

            return (this._applicationContext.SaveChanges() >= 0);
        }

        public bool Delete(Image value)
        {
            this._applicationContext.Images.Remove(value);
            
            return (this._applicationContext.SaveChanges() >= 0);
        }

        public bool Delete(int id)
        {
            var image = this.Get(id);
            if (image == null)
            {
                throw new Exception("Błąd podczas usówania, brak elementu o id : " + id);
            }

            return this.Delete(image);
        }
    }
}

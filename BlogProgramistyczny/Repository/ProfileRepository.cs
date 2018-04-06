using BlogProgramistyczny.Context;
using BlogProgramistyczny.Entites;
using System;
using System.Collections.Generic;
using BlogProgramistyczny.Repository.Interface;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace BlogProgramistyczny.Repository
{
    public class ProfileRepository : IProfileRepository
    {
        public readonly ApplicationContext _applicationContext;

        public ProfileRepository(ApplicationContext applicationContext)
        {
            this._applicationContext = applicationContext;
        }

        public Profil Get(int id)
        {
            return this._applicationContext.Profile
                .Include(p => p.Options)
                .FirstOrDefault(p => p.Id == id);
        }

        public IEnumerable<Profil> List()
        {
            return this._applicationContext.Profile
                .Include(p => p.Options);
        }

        public bool Save(Profil value)
        {
            this._applicationContext.Profile.Add(value);

            return (this._applicationContext.SaveChanges() >= 0);
        }

        public bool Update(Profil value)
        {
            this._applicationContext.Profile.Update(value);

            return (this._applicationContext.SaveChanges() >= 0);
        }

        public bool Delete(Profil value)
        {
            this._applicationContext.Profile.Remove(value);
            
            return (this._applicationContext.SaveChanges() >= 0);
        }

        public bool Delete(int id)
        {
            var profile = this.Get(id);
            if (profile == null)
            {
                throw new Exception("Błąd podczas usówania, brak elementu o id : " + id);
            }

            return this.Delete(profile);
        }
    }
}

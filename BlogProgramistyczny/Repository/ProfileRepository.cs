using BlogProgramistyczny.Context;
using BlogProgramistyczny.Entites;
using System;
using System.Collections.Generic;
using BlogProgramistyczny.Repository.Interface;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using BlogProgramistyczny.Helpers.Paginate;

namespace BlogProgramistyczny.Repository
{
    public class ProfileRepository : IProfileRepository
    {
        private readonly ApplicationContext _applicationContext;

        public ProfileRepository(ApplicationContext applicationContext)
        {
            _applicationContext = applicationContext;
        }

        public Profil Get(int id)
        {
            return _applicationContext.Profile
                .Include(p => p.Options)
                .FirstOrDefault(p => p.Id == id);
        }

        public IEnumerable<Profil> List()
        {
            return _applicationContext.Profile
                .Include(p => p.Options)
                .ToList();
        }

        public bool Save(Profil value)
        {
            _applicationContext.Profile.Add(value);

            return (_applicationContext.SaveChanges() >= 0);
        }

        public bool Update(Profil value)
        {
            _applicationContext.Profile.Update(value);

            return (_applicationContext.SaveChanges() >= 0);
        }

        public bool Delete(Profil value)
        {
            _applicationContext.Profile.Remove(value);
            
            return (_applicationContext.SaveChanges() >= 0);
        }

        public bool Delete(int id)
        {
            var profile = Get(id);
            if (profile == null)
            {
                throw new Exception("Błąd podczas usówania, brak elementu o id : " + id);
            }

            return Delete(profile);
        }

        public IEnumerable<Profil> ListByPaginatedParameters(Parameters parameters)
        {
            var query = _applicationContext.Profile
                .Include(p => p.Options)
                .AsQueryable();

            if (parameters.Sort != null)
            {
                switch (parameters.Sort)
                {
                    case "DESC":
                        query = query.OrderByDescending(a => a.Id);
                        break;
                    case "ASC":
                        query = query.OrderBy(a => a.Id);
                        break;
                    default:
                        break;
                }
            }

            return query.Skip(
                (parameters.Index - 1) * parameters.Size)
                .Take(parameters.Size)
                .ToList();
        }

        public int Count()
        {
            return _applicationContext.Profile.Count();
        }
    }
}

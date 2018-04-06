using System.Collections.Generic;

namespace BlogProgramistyczny.Repository.Interface
{
    public interface IRepository<T>
    {
        IEnumerable<T> List();
        T Get(int id);
        bool Save(T value);
        bool Update(T value);
        bool Delete(T value);
        bool Delete(int id);
    }
}

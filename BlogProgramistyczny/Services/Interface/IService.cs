using BlogProgramistyczny.Helpers.Paginate;

namespace BlogProgramistyczny.Services.Interface
{
    public interface IService<V,C,U>
    {
        PaginatedView<V> List(Parameters parameters);
        V Get(int id);
        bool Save(C value);
        bool Update(int id, U value);
        bool Delete(int id);
    }
}

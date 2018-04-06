using BlogProgramistyczny.Helpers.Paginate;

namespace BlogProgramistyczny.Services.Interface
{
    public interface IService<V,C>
    {
        PaginatedListMapped<C> List(int pageIndex, int pageSize, string sort);
        C Get(int id);
        bool Save(V value);
        bool Update(int id, V value);
        bool Delete(int id);
    }
}

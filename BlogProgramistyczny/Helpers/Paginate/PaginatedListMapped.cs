using System.Collections.Generic;

namespace BlogProgramistyczny.Helpers.Paginate
{
    public class PaginatedListMapped<T>
    {
        public int PageIndex { get; set; }
        public int TotalPages { get; set; }
        public List<T> Items { get; set; }
    }
}

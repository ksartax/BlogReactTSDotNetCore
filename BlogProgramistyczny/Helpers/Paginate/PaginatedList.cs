using System;
using System.Collections.Generic;
using System.Linq;

namespace BlogProgramistyczny.Helpers.Paginate
{
    public class PaginatedList<T> : List<T> 
    {
        public int PageIndex { get; set; }
        public int TotalPages { get; set; }
        public List<T> Items { get; set; }

        public PaginatedList(List<T> items, int count, int pageIndex, int pageSize)
        {
            PageIndex = pageIndex;
            TotalPages = (int)Math.Ceiling(count / (double)pageSize);

            this.AddRange(items);
            this.Items = items;
        }

        public bool HasPreviousPage
        {
            get
            {
                return (PageIndex > 1);
            }
        }

        public bool HasNextPage
        {
            get
            {
                return (PageIndex < TotalPages);
            }
        }

        public static PaginatedList<T> Create (
            IQueryable<T> source, int pageIndex, int pageSize)
        {
            var count = source.Count();
            var items = source.Skip(
                (pageIndex - 1) * pageSize)
                .Take(pageSize).ToList();

            return new PaginatedList<T>(items, count, pageIndex, pageSize);
        }
    }
}

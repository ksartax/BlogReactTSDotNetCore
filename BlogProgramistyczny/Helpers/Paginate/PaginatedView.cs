using System;
using System.Collections.Generic;

namespace BlogProgramistyczny.Helpers.Paginate
{
    public class PaginatedView<T> 
    {
        public Parameters Parameters { get; set; }
        public List<T> Items { get; set; }

        public PaginatedView(List<T> items, Parameters parameters)
        {
            Parameters = new Parameters
            {
                Index = parameters.Index,
                Size = parameters.Size,
                Sort = parameters.Sort,
                TotalIndex = (int)Math.Ceiling(parameters.Count / (double)parameters.Size),
                Count = parameters.Count,
                SearchCategory = parameters.SearchCategory
            };

            Items = items;
        }
    }
}

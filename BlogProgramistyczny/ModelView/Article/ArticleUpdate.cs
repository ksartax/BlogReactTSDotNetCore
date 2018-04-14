using BlogProgramistyczny.ModelView.Image;
using System.Collections.Generic;

namespace BlogProgramistyczny.ModelView.Article
{
    public class ArticleUpdate
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string Url { get; set; }

        public virtual ICollection<int> Categories { get; set; }
        public virtual ICollection<ImageCreate> Images { get; set; }
    }
}

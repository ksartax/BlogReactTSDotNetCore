namespace Models.ModelView.Category
{
    public class CategoryView
    {
        public int Id { get; set; }

        public string Title { get; set; }
        public string Description { get; set; }
        public string UrlTitle { get; set; }

        public CategoryView(Entites.Category category)
        {
            Id = category.Id;
            Title = category.Title;
            Description = category.Description;
            UrlTitle = category.UrlTitle;
        }
    }
}

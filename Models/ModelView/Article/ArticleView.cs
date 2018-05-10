using Models.ModelView.ArticleComment;
using Models.ModelView.Category;
using Models.ModelView.Image;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Models.ModelView.Article
{
    public class ArticleView
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Date { get; set; }
        public ImageView Image { get; set; }
        public string TitleUrl { get; set; }

        public virtual ICollection<CategoryView> Categories { get; set; } = new List<CategoryView>();
        public virtual ICollection<ArticleCommentView> Comments { get; set; } = new List<ArticleCommentView>();

        public ArticleView() { }

        public ArticleView(Entites.Article article)
        {
            Id = article.Id;
            Title = article.Title;
            Description = article.Description;
            Date = article.CreatedAt.ToString("dd-MM-yyyy");
            TitleUrl = article.Url;

            Image = new ImageView()
            {
                Path = article.Images?.FirstOrDefault()?.Image?.Path
            };

            Categories = new List<CategoryView>();
            foreach (var item in article.Categories)
            {
                Categories.Add(new CategoryView(item.Category));
            }
        }
    }
}

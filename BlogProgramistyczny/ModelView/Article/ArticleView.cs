using BlogProgramistyczny.ModelView.ArticleComment;
using BlogProgramistyczny.ModelView.Image;
using System;
using System.Collections.Generic;
using System.Linq;

namespace BlogProgramistyczny.ModelView.Article
{
    public class ArticleView
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Date { get; set; }
        public ImageView Image { get; set; }
        public string TitleUrl { get; set; }

        public virtual ICollection<ArticleCommentView> Comments { get; set; }

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
        }
    }
}

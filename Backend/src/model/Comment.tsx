import { ArticleView } from '../model/Article';

export class CommentView {
    public Id: number;
    public Description: string;
    public Surname: string;
    public Date: string;
    public Article: ArticleView;
    public CommentReplace: CommentView;

    constructor(description?: string, surname?: string, date?: string, id?: number, article?: ArticleView) {
        this.Id = id ? id : 0;
        this.Description = description;
        this.Surname = surname;
        this.Date = date;
        this.Article = article;
    }

    public addResponseComment(commentView: CommentView) {
        this.CommentReplace = commentView;
    }
}

export class CommentCreate {
    public CommentId: number;
    public Description: string;
    public FirstName: string;

    constructor(description?: string, surname?: string, commentId?: number) {
        this.CommentId = commentId ? commentId : 0;
        this.Description = description;
        this.FirstName = surname;
    }
}
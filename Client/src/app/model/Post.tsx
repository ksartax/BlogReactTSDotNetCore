import Config from '../ApiConfig/Config';

export default class Post {

    public Id: number;
    public Title: string;
    public Description: string;
    public Date: string;
    public ImgPath: string;
    public urlTitle: string;
    public Comments: Array<Comment>;

    constructor(id?: number, title?: string, description?: string, date?: string, imgPath?: string, urlTitle?: string) {
        this.Id = id ? id : 0;
        this.Title = title ? title : '';
        this.Description = description ? description : '';
        this.Date = date ? date : '';
        this.ImgPath = imgPath ? Config.API_FILE + imgPath : '';
        this.urlTitle = urlTitle ? urlTitle : '';

        this.Comments = new Array<Comment>();
    }

    public addComment(comment: Comment) {
        this.Comments.push(comment);
    }
}

export class Comment {
    public Id: number;
    public Description: string;
    public Surname: string;
    public Date: string;
    public Comments: Comment;

    constructor(description: string, surname: string, date: string, id?: number) {
        this.Id = id ? id : 0;
        this.Description = description;
        this.Surname = surname;
        this.Date = date;
    }
}
export class ArticleView {

    public Id: number;
    public Title: string;
    public Description: string;
    public Date: string;
    public ImgPath: string;
    public urlTitle: string;

    constructor(id?: number, title?: string, description?: string, date?: string, imgPath?: string, urlTitle?: string) {
        this.Id = id ? id : 0;
        this.Title = title ? title : '';
        this.Description = description ? description : '';
        this.Date = date ? date : '';
        this.ImgPath = imgPath ? imgPath : '';
        this.urlTitle = urlTitle ? urlTitle : '';
    }
}

export class ArticleCreate {

    public Title: string;
    public Description: string;
    public Url: string;
    public Images: Array<Image>;

    constructor(title?: string, description?: string, urlTitle?: string) {
        this.Title = title ? title : '';
        this.Description = description ? description : '';
        this.Url = urlTitle ? urlTitle : '';

        this.Images = new Array<Image>();
    }
}

export class Image {
    public Path: string;

    constructor(path?: string) {
        this.Path = path;
    }
}
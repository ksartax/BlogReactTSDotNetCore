import { CategoryView } from '../model/Category';

export class ArticleView {

    public Id: number;
    public Title: string;
    public Description: string;
    public Date: string;
    public ImgPath: string;
    public urlTitle: string;
    public Categories: Array<CategoryView>;

    constructor(id?: number, title?: string, description?: string, date?: string, imgPath?: string, urlTitle?: string) {
        this.Id = id ? id : 0;
        this.Title = title ? title : '';
        this.Description = description ? description : '';
        this.Date = date ? date : '';
        this.ImgPath = imgPath ? imgPath : '';
        this.urlTitle = urlTitle ? urlTitle : '';

        this.Categories = new Array<CategoryView>();
    }

    public GetArrayCategoryId() {
        let selec = new Array<number>();

        for (let po of this.Categories) {
            selec.push(po.Id);
        }

        return selec;
    }
}

export class ArticleCreate {

    public Title: string;
    public Description: string;
    public Url: string;
    public Images: Array<Image>;
    public Categories: Array<number>;

    constructor(title?: string, description?: string, urlTitle?: string) {
        this.Title = title ? title : '';
        this.Description = description ? description : '';
        this.Url = urlTitle ? urlTitle : '';
        
        this.Categories = new Array<number>();
        this.Images = new Array<Image>();
    }
}

export class Image {
    public Path: string;

    constructor(path?: string) {
        this.Path = path;
    }
}
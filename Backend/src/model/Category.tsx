export class CategoryView {

    public Id: number;
    public Title: string;
    public Description: string;
    public UrlTitle: string;

    constructor(id?: number, title?: string, description?: string, urlTitle?: string) {
        this.Id = id ? id : 0;
        this.Title = title ? title : '';
        this.Description = description ? description : '';
        this.UrlTitle = urlTitle ? urlTitle : '';
    }
}

export class CategoryCreate {

    public Title: string;
    public Description: string;
    public UrlTitle: string;

    constructor(title?: string, description?: string, urlTitle?: string) {
        this.Title = title ? title : '';
        this.Description = description ? description : '';
        this.UrlTitle = urlTitle ? urlTitle : '';
    }
}
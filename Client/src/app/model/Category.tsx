export default class Category {
    public Id: number;
    public Name: string;
    public UrlTitle: string;

    constructor(id: number, name: string, urlTitle: string) {
        this.Id = id ? id : 0;
        this.Name = name;
        this.UrlTitle = urlTitle;
    }
}

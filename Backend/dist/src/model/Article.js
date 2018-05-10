"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ArticleView {
    constructor(id, title, description, date, imgPath, urlTitle) {
        this.Id = id ? id : 0;
        this.Title = title ? title : '';
        this.Description = description ? description : '';
        this.Date = date ? date : '';
        this.ImgPath = imgPath ? imgPath : '';
        this.urlTitle = urlTitle ? urlTitle : '';
        this.Categories = new Array();
    }
    GetArrayCategoryId() {
        let selec = new Array();
        for (let po of this.Categories) {
            selec.push(po.Id);
        }
        return selec;
    }
}
exports.ArticleView = ArticleView;
class ArticleCreate {
    constructor(title, description, urlTitle) {
        this.Title = title ? title : '';
        this.Description = description ? description : '';
        this.Url = urlTitle ? urlTitle : '';
        this.Categories = new Array();
        this.Images = new Array();
    }
}
exports.ArticleCreate = ArticleCreate;
class Image {
    constructor(path) {
        this.Path = path;
    }
}
exports.Image = Image;
//# sourceMappingURL=Article.js.map
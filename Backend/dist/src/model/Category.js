"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CategoryView {
    constructor(id, title, description, urlTitle) {
        this.Id = id ? id : 0;
        this.Title = title ? title : '';
        this.Description = description ? description : '';
        this.UrlTitle = urlTitle ? urlTitle : '';
    }
}
exports.CategoryView = CategoryView;
class CategoryCreate {
    constructor(title, description, urlTitle) {
        this.Title = title ? title : '';
        this.Description = description ? description : '';
        this.UrlTitle = urlTitle ? urlTitle : '';
    }
}
exports.CategoryCreate = CategoryCreate;
//# sourceMappingURL=Category.js.map
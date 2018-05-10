"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Config_1 = require("../ApiConfig/Config");
var Post = /** @class */ (function () {
    function Post(id, title, description, date, imgPath, urlTitle) {
        this.Id = id ? id : 0;
        this.Title = title ? title : '';
        this.Description = description ? description : '';
        this.Date = date ? date : '';
        this.ImgPath = imgPath ? Config_1.default.API_FILE + imgPath : '';
        this.urlTitle = urlTitle ? urlTitle : '';
        this.Comments = new Array();
    }
    Post.prototype.addComment = function (comment) {
        this.Comments.push(comment);
    };
    return Post;
}());
exports.default = Post;
var Comment = /** @class */ (function () {
    function Comment(description, surname, date, id) {
        this.Id = id ? id : 0;
        this.Description = description;
        this.Surname = surname;
        this.Date = date;
    }
    return Comment;
}());
exports.Comment = Comment;
//# sourceMappingURL=Post.js.map
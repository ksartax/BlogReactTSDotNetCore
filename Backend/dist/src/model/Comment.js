"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CommentView {
    constructor(description, surname, date, id, article) {
        this.Id = id ? id : 0;
        this.Description = description;
        this.Surname = surname;
        this.Date = date;
        this.Article = article;
    }
    addResponseComment(commentView) {
        this.CommentReplace = commentView;
    }
}
exports.CommentView = CommentView;
class CommentCreate {
    constructor(description, surname, commentId) {
        this.CommentId = commentId ? commentId : 0;
        this.Description = description;
        this.FirstName = surname;
    }
}
exports.CommentCreate = CommentCreate;
//# sourceMappingURL=Comment.js.map
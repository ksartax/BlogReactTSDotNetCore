"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var semantic_ui_react_1 = require("semantic-ui-react");
var Post_1 = require("../../model/Post");
var Config_1 = require("../../ApiConfig/Config");
var CommentF = /** @class */ (function (_super) {
    __extends(CommentF, _super);
    function CommentF(props) {
        var _this = _super.call(this, props) || this;
        _this.config = new Config_1.default();
        _this.state = {
            firstName: "",
            email: "",
            description: "",
            loaderSend: false,
            loaderComments: true,
            Comments: Array(),
            sendStatus: 0
        };
        _this.handleSubmit.bind(_this);
        _this.handleInput.bind(_this);
        return _this;
    }
    CommentF.prototype.componentWillReceiveProps = function (nextProps) {
        this.loadPostComments(nextProps.postId);
    };
    CommentF.prototype.loadPostComments = function (postId) {
        var context = this;
        context.setState({
            loaderComments: true
        });
        this.config.get("Article/" + postId + "/Comments")
            .then(function (response) {
            return response.json();
        })
            .then(function (response) {
            if (response.code != 200) {
            }
            var responseData = response.responseData;
            var comments = new Array();
            for (var _i = 0, responseData_1 = responseData; _i < responseData_1.length; _i++) {
                var po = responseData_1[_i];
                var com = new Post_1.Comment(po.description, po.surname, po.date, po.id);
                if (po.replayComment.length > 0) {
                    com.Comments = new Post_1.Comment(po.replayComment[0].description, po.replayComment[0].surname, po.replayComment[0].date, po.replayComment[0].id);
                }
                comments.push(com);
            }
            context.setState({
                Comments: comments,
                loaderComments: false
            });
        })
            .catch(function (err) {
            console.log(err);
        });
    };
    CommentF.prototype.handleSubmit = function () {
        var context = this;
        context.setState({
            loaderSend: true
        });
        var comment = {
            FirstName: this.state.firstName,
            Description: this.state.description
        };
        this.config.post("Article/" + this.props.postId + "/Comment/Add", comment)
            .then(function (response) {
            return response.json();
        })
            .then(function (response) {
            context.setState({
                loaderSend: false,
            });
            if (response.code != 200) {
                context.setState({
                    sendStatus: -1
                });
                return;
            }
            context.loadPostComments(context.props.postId);
            context.setState({
                sendStatus: 1
            });
        })
            .catch(function (err) {
            console.log(err);
        });
    };
    CommentF.prototype.handleInput = function (event) {
        this.setState((_a = {},
            _a[event.target.name] = event.target.value,
            _a));
        var _a;
    };
    CommentF.prototype.render = function () {
        return (React.createElement(semantic_ui_react_1.Card.Group, null,
            React.createElement(semantic_ui_react_1.Card, { fluid: true, content: true },
                this.state.loaderSend == true || this.state.loaderComments == true ? (React.createElement(semantic_ui_react_1.Dimmer, { active: true, inverted: true },
                    React.createElement(semantic_ui_react_1.Loader, { size: 'medium' }, "Wysy\u0142anie"))) : '',
                this.state.sendStatus == 1 ? (React.createElement(semantic_ui_react_1.Message, { positive: true },
                    React.createElement(semantic_ui_react_1.Message.Header, null, "Pomy\u015Blnie wys\u0142ano komentarz"))) : this.state.sendStatus == -1 ? (React.createElement(semantic_ui_react_1.Message, { negative: true },
                    React.createElement(semantic_ui_react_1.Message.Header, null, "B\u0142\u0105d podczas wysy\u0142ania wiadomosci, sproboj ponownie lub wy\u015Blij na email"))) : '',
                React.createElement(semantic_ui_react_1.Card.Content, null,
                    React.createElement(semantic_ui_react_1.Card.Description, null,
                        React.createElement(semantic_ui_react_1.Comment.Group, null,
                            this.state.Comments.map(function (comment) { return (React.createElement(semantic_ui_react_1.Comment, null,
                                React.createElement(semantic_ui_react_1.Comment.Content, null,
                                    React.createElement(semantic_ui_react_1.Comment.Author, null,
                                        comment.Surname,
                                        "  ",
                                        React.createElement("span", { style: {
                                                color: 'rgba(0, 0, 0, .4)',
                                                fontSize: '.875em'
                                            } },
                                            " ",
                                            comment.Date,
                                            " "),
                                        " "),
                                    React.createElement(semantic_ui_react_1.Comment.Text, null,
                                        React.createElement("p", null, comment.Description))),
                                comment.Comments == null ? "" :
                                    React.createElement(semantic_ui_react_1.Comment.Group, null,
                                        React.createElement(semantic_ui_react_1.Comment, null,
                                            React.createElement(semantic_ui_react_1.Comment.Content, null,
                                                React.createElement(semantic_ui_react_1.Comment.Author, null,
                                                    comment.Comments.Surname,
                                                    "  ",
                                                    React.createElement("span", { style: {
                                                            color: 'rgba(0, 0, 0, .4)',
                                                            fontSize: '.875em'
                                                        } },
                                                        " ",
                                                        comment.Comments.Date,
                                                        " ")),
                                                React.createElement(semantic_ui_react_1.Comment.Text, null, comment.Comments.Description)))))); }),
                            React.createElement(semantic_ui_react_1.Form, { onSubmit: this.handleSubmit.bind(this) },
                                React.createElement(semantic_ui_react_1.Form.Input, { name: 'firstName', label: "Imie", value: this.state.firstName, required: true, onChange: this.handleInput.bind(this) }),
                                React.createElement(semantic_ui_react_1.Form.TextArea, { name: 'description', value: this.state.description, label: "Komentarz", required: true, onChange: this.handleInput.bind(this) }),
                                React.createElement(semantic_ui_react_1.Button, { content: 'Add Comment', labelPosition: 'left', icon: 'edit', primary: true }))))))));
    };
    return CommentF;
}(React.Component));
exports.default = CommentF;
//# sourceMappingURL=CommentF.js.map
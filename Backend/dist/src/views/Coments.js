"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const semantic_ui_react_1 = require("semantic-ui-react");
const Config_1 = require("../../ApiConfig/Config");
const Comment_1 = require("../model/Comment");
const Article_1 = require("../model/Article");
const CommentReplace_1 = require("../components/CommentReplace");
class Comments extends React.Component {
    constructor(props) {
        super(props);
        this.config = new Config_1.default();
        this.state = {
            comments: Array(),
            loaderComments: true,
            pageIndex: 0,
            totalPage: 0
        };
    }
    componentDidMount() {
        this.loadComments(1);
    }
    loadComments(page) {
        let context = this;
        this.config.get("Comments?page=" + page + "&limit=10")
            .then(function (response) {
            return response.json();
        })
            .then(function (response) {
            context.setState({
                loaderComments: false
            });
            if (response.code != 200) {
            }
            let _comments = new Array();
            let responseData = response.responseData;
            for (let po of responseData.items) {
                let _comment = new Comment_1.CommentView(po.description, po.surname, po.date, po.id, new Article_1.ArticleView(po.articleView.id, po.articleView.title, po.articleView.description, po.articleView.date));
                if (po.replayComment.length > 0) {
                    _comment.addResponseComment(new Comment_1.CommentView(po.replayComment[0].description, po.replayComment[0].surname, po.replayComment[0].date, po.replayComment[0].id));
                }
                _comments.push(_comment);
            }
            context.setState({
                pageIndex: responseData.parameters.index,
                totalPage: responseData.parameters.totalIndex,
                comments: _comments
            });
        })
            .catch(function (err) {
            console.log(err);
        });
    }
    dellComment(id) {
        let context = this;
        this.config.get(`Comments/${id}/Remove`)
            .then(function (response) {
            return response.json();
        })
            .then(function (response) {
            if (response.code != 200) {
            }
            context.loadComments(context.state.pageIndex);
        })
            .catch(function (err) {
            console.log(err);
        });
    }
    render() {
        return (React.createElement(semantic_ui_react_1.Segment, { stacked: true },
            React.createElement(semantic_ui_react_1.Table, { celled: true },
                React.createElement(semantic_ui_react_1.Table.Header, null,
                    React.createElement(semantic_ui_react_1.Table.Row, null,
                        React.createElement(semantic_ui_react_1.Table.HeaderCell, null, "Id"),
                        React.createElement(semantic_ui_react_1.Table.HeaderCell, null, "Tytu\u0142 Posta"),
                        React.createElement(semantic_ui_react_1.Table.HeaderCell, null, "Imie"),
                        React.createElement(semantic_ui_react_1.Table.HeaderCell, null, "Opis"),
                        React.createElement(semantic_ui_react_1.Table.HeaderCell, null, "Akcja"))),
                React.createElement(semantic_ui_react_1.Table.Body, null,
                    this.state.loaderComments == true ? (React.createElement(semantic_ui_react_1.Dimmer, { active: true, inverted: true },
                        React.createElement(semantic_ui_react_1.Loader, { size: 'medium' }, "\u0141adowanie"))) : '',
                    this.state.comments.map((comment) => (React.createElement(semantic_ui_react_1.Table.Row, null,
                        React.createElement(semantic_ui_react_1.Table.Cell, null, comment.Id),
                        React.createElement(semantic_ui_react_1.Table.Cell, null, comment.Article.Title),
                        React.createElement(semantic_ui_react_1.Table.Cell, null, comment.Surname),
                        React.createElement(semantic_ui_react_1.Table.Cell, null, comment.Description),
                        React.createElement(semantic_ui_react_1.Table.Cell, { width: 2 },
                            comment.CommentReplace == null
                                ?
                                    React.createElement(CommentReplace_1.default, { commentId: comment.Id, stateLoadComment: this })
                                :
                                    React.createElement(semantic_ui_react_1.Popup, { trigger: React.createElement(semantic_ui_react_1.Button, { content: "Odpowiedz" }), content: comment.CommentReplace.Description }),
                            React.createElement(semantic_ui_react_1.Button, { onClick: this.dellComment.bind(this, comment.Id), content: 'Wykasuj', negative: true })))))),
                React.createElement(semantic_ui_react_1.Table.Footer, null,
                    React.createElement(semantic_ui_react_1.Table.Row, null,
                        React.createElement(semantic_ui_react_1.Table.HeaderCell, { colSpan: '5' },
                            React.createElement(semantic_ui_react_1.Menu, { floated: 'right', pagination: true },
                                React.createElement(semantic_ui_react_1.Menu.Item, { as: 'a', disabled: this.state.pageIndex == 1, icon: true, onClick: () => {
                                        this.loadComments(--this.state.pageIndex);
                                    } },
                                    React.createElement(semantic_ui_react_1.Icon, { name: 'chevron left' })),
                                React.createElement(semantic_ui_react_1.Menu.Item, { as: 'a', icon: true, disabled: this.state.pageIndex == this.state.totalPage, onClick: () => {
                                        this.loadComments(++this.state.pageIndex);
                                    } },
                                    React.createElement(semantic_ui_react_1.Icon, { name: 'chevron right' })))))))));
    }
}
exports.default = Comments;
//# sourceMappingURL=Coments.js.map
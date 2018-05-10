"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const semantic_ui_react_1 = require("semantic-ui-react");
const Comment_1 = require("../model/Comment");
const Config_1 = require("../../ApiConfig/Config");
class CommentReplace extends React.Component {
    constructor() {
        super(...arguments);
        this.config = new Config_1.default();
        this.state = {
            commentCreate: new Comment_1.CommentCreate("", Config_1.default.COMMENT_FURST_NAME),
            open: false
        };
    }
    addComments(id) {
        let context = this;
        this.config.post(`/Comments/${id}/Replay`, this.state.commentCreate)
            .then(function (response) {
            return response.json();
        })
            .then(function (response) {
            if (response.code != 200) {
                return;
            }
            context.props.stateLoadComment.loadComments(context.props.stateLoadComment.state.pageIndex);
            context.setState({
                open: false
            });
        })
            .catch(function (err) {
            console.log(err);
        });
    }
    render() {
        return (React.createElement(semantic_ui_react_1.Modal, { open: this.state.open, trigger: React.createElement(semantic_ui_react_1.Button, { onClick: () => {
                    this.setState({
                        open: true
                    });
                } }, "Odpisz") },
            React.createElement(semantic_ui_react_1.Modal.Header, null, "Wiadomosc zwrotna"),
            React.createElement(semantic_ui_react_1.Modal.Content, { image: true },
                React.createElement(semantic_ui_react_1.Modal.Description, null,
                    React.createElement(semantic_ui_react_1.Segment, null,
                        React.createElement(semantic_ui_react_1.Form, { onSubmit: this.addComments.bind(this, this.props.commentId) },
                            React.createElement(semantic_ui_react_1.Form.Input, { name: 'firstName', label: "Imie", value: this.state.commentCreate.FirstName, required: true, onChange: (val) => {
                                    var comment = this.state.commentCreate;
                                    comment.FirstName = val.currentTarget.value;
                                    this.setState({
                                        commentCreate: comment
                                    });
                                } }),
                            React.createElement(semantic_ui_react_1.Form.TextArea, { name: 'description', value: this.state.commentCreate.Description, label: "Komentarz", required: true, onChange: (val) => {
                                    var comment = this.state.commentCreate;
                                    comment.Description = val.currentTarget.value;
                                    this.setState({
                                        commentCreate: comment
                                    });
                                } }),
                            React.createElement(semantic_ui_react_1.Button, { content: 'Odpisz', labelPosition: 'left', icon: 'edit', primary: true }),
                            React.createElement(semantic_ui_react_1.Button, { content: 'Wyjdz', labelPosition: 'left', icon: 'close', negative: true, onClick: () => {
                                    this.setState({
                                        open: false
                                    });
                                } })))))));
    }
}
exports.default = CommentReplace;
//# sourceMappingURL=CommentReplace.js.map
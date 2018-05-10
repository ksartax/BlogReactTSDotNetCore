"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const semantic_ui_react_1 = require("semantic-ui-react");
class ArticleViewModel extends React.Component {
    render() {
        return (React.createElement(semantic_ui_react_1.Modal, { trigger: React.createElement(semantic_ui_react_1.Button, null, "Podgl\u0105d") },
            React.createElement(semantic_ui_react_1.Modal.Header, null, "Podgl\u0105d Artyku\u0142u"),
            React.createElement(semantic_ui_react_1.Modal.Content, { image: true },
                React.createElement(semantic_ui_react_1.Modal.Description, null,
                    React.createElement(semantic_ui_react_1.Segment, null,
                        React.createElement(semantic_ui_react_1.Item.Group, { relaxed: true },
                            React.createElement(semantic_ui_react_1.Item, null,
                                React.createElement(semantic_ui_react_1.Item.Image, { src: this.props.article.ImgPath }),
                                React.createElement(semantic_ui_react_1.Item.Content, null,
                                    React.createElement(semantic_ui_react_1.Item.Header, { as: 'a1' }, this.props.article.Title),
                                    React.createElement(semantic_ui_react_1.Item.Description, { dangerouslySetInnerHTML: { __html: this.props.article.Description } })))))))));
    }
}
exports.default = ArticleViewModel;
//# sourceMappingURL=ArticleViewModel.js.map
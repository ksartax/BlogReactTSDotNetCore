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
var CommentF_1 = require("./components/CommentF");
var react_router_dom_1 = require("react-router-dom");
var PostViewService_1 = require("../service/PostViewService");
var PostView = /** @class */ (function (_super) {
    __extends(PostView, _super);
    function PostView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PostView.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement(semantic_ui_react_1.Segment, null,
                this.state.loaderPost == true ? (React.createElement(semantic_ui_react_1.Dimmer, { active: true, inverted: true },
                    React.createElement(semantic_ui_react_1.Loader, { size: 'medium' }, "\u0141adowanie"))) : '',
                React.createElement(semantic_ui_react_1.Breadcrumb, { style: { marginBottom: '2em' } },
                    React.createElement(semantic_ui_react_1.Breadcrumb.Section, { link: true },
                        React.createElement(react_router_dom_1.NavLink, { to: "/" }, "Strona g\u0142\u00F3wna")),
                    React.createElement(semantic_ui_react_1.Breadcrumb.Divider, null),
                    React.createElement(semantic_ui_react_1.Breadcrumb.Section, { active: true },
                        " ",
                        this.state.post.Title,
                        " ")),
                React.createElement(semantic_ui_react_1.Header, { as: 'h2', icon: 'star', content: this.state.post.Date, size: 'tiny', style: {
                        marginTop: '0.5em'
                    } }),
                React.createElement(semantic_ui_react_1.Item.Group, { relaxed: true },
                    React.createElement(semantic_ui_react_1.Item, null,
                        React.createElement(semantic_ui_react_1.Item.Image, { src: this.state.post.ImgPath }),
                        React.createElement(semantic_ui_react_1.Item.Content, null,
                            React.createElement(semantic_ui_react_1.Item.Header, { as: 'a1' }, this.state.post.Title),
                            React.createElement(semantic_ui_react_1.Item.Description, { dangerouslySetInnerHTML: { __html: this.state.post.Description } }))))),
            React.createElement(semantic_ui_react_1.Segment, null,
                React.createElement(CommentF_1.default, { postId: this.state.post.Id }))));
    };
    return PostView;
}(PostViewService_1.default));
exports.default = PostView;
//# sourceMappingURL=PostView.js.map
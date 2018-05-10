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
var react_router_dom_1 = require("react-router-dom");
var FeaturedPost = /** @class */ (function (_super) {
    __extends(FeaturedPost, _super);
    function FeaturedPost() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FeaturedPost.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement(semantic_ui_react_1.Grid, { columns: 1, divided: true, relaxed: true, stackable: true, textAlign: 'center', id: 'new-grid' },
                React.createElement(semantic_ui_react_1.Grid.Column, null,
                    React.createElement(semantic_ui_react_1.Header, { as: 'h2', icon: 'star', content: 'Wyróżniony Post', size: 'tiny', style: {
                            marginTop: '0.5em'
                        } }),
                    React.createElement(semantic_ui_react_1.Header, { as: 'h1', content: React.createElement(react_router_dom_1.NavLink, { style: { color: 'white' }, to: "/view/" + this.props.post.urlTitle }, this.props.post.Title), inverted: true, style: {
                            fontSize: '4em',
                            fontWeight: 'normal',
                            marginBottom: '3em',
                            marginTop: '3em',
                            textShadow: '4px -1px 0px black'
                        } })))));
    };
    return FeaturedPost;
}(React.Component));
exports.default = FeaturedPost;
//# sourceMappingURL=FeaturedPost.js.map
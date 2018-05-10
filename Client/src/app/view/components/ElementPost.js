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
var react_router_dom_1 = require("react-router-dom");
var semantic_ui_react_1 = require("semantic-ui-react");
var ElementPostCart = /** @class */ (function (_super) {
    __extends(ElementPostCart, _super);
    function ElementPostCart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ElementPostCart.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement(semantic_ui_react_1.Grid, { columns: 1 },
                React.createElement(semantic_ui_react_1.Grid.Column, null,
                    React.createElement(semantic_ui_react_1.Card, { fluid: true },
                        React.createElement(semantic_ui_react_1.Header, { as: 'h2', icon: 'calendar', content: this.props.post.Date, size: 'tiny' }),
                        React.createElement(semantic_ui_react_1.Card.Content, { textAlign: 'center' },
                            React.createElement(semantic_ui_react_1.Card.Header, { style: { paddingBottom: '1em' } },
                                React.createElement(react_router_dom_1.NavLink, { style: { color: 'black' }, to: "/view/" + this.props.post.urlTitle }, this.props.post.Title)),
                            React.createElement(semantic_ui_react_1.Image, { src: this.props.post.ImgPath, style: {
                                    maxWidth: '100%',
                                    width: 'auto',
                                    height: 'auto',
                                } }),
                            React.createElement(semantic_ui_react_1.Card.Description, { style: { paddingTop: '1em' }, dangerouslySetInnerHTML: { __html: this.props.post.Description.slice(0, 200) + " ..." } })))))));
    };
    return ElementPostCart;
}(React.Component));
exports.ElementPostCart = ElementPostCart;
var ElementPostItem = /** @class */ (function (_super) {
    __extends(ElementPostItem, _super);
    function ElementPostItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ElementPostItem.prototype.render = function () {
        return (React.createElement(semantic_ui_react_1.Item, null,
            React.createElement(semantic_ui_react_1.Item.Image, { size: 'tiny', src: this.props.post.ImgPath }),
            React.createElement(semantic_ui_react_1.Item.Content, null,
                React.createElement(semantic_ui_react_1.Item.Header, { as: 'a' },
                    React.createElement(react_router_dom_1.NavLink, { style: { color: 'black' }, to: "/view/" + this.props.post.urlTitle }, this.props.post.Title)),
                React.createElement(semantic_ui_react_1.Item.Description, { dangerouslySetInnerHTML: { __html: this.props.post.Description.slice(0, 100) + " ..." } }),
                React.createElement("hr", null))));
    };
    return ElementPostItem;
}(React.Component));
exports.ElementPostItem = ElementPostItem;
//# sourceMappingURL=ElementPost.js.map
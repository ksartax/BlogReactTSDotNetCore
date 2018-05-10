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
var ContactForm_1 = require("./components/ContactForm");
var react_router_dom_1 = require("react-router-dom");
var AboutService_1 = require("../service/AboutService");
var About = /** @class */ (function (_super) {
    __extends(About, _super);
    function About() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    About.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement(semantic_ui_react_1.Breadcrumb, { style: { marginBottom: '2em' } },
                React.createElement(semantic_ui_react_1.Breadcrumb.Section, { link: true },
                    React.createElement(react_router_dom_1.NavLink, { to: "/" }, "Strona g\u0142\u00F3wna")),
                React.createElement(semantic_ui_react_1.Breadcrumb.Divider, null),
                React.createElement(semantic_ui_react_1.Breadcrumb.Section, { active: true }, "O mnie")),
            React.createElement(semantic_ui_react_1.Segment, null,
                React.createElement(semantic_ui_react_1.Item.Group, { relaxed: true },
                    React.createElement(semantic_ui_react_1.Item, null,
                        this.state.loaderProfile == true ? (React.createElement(semantic_ui_react_1.Dimmer, { active: true, inverted: true },
                            React.createElement(semantic_ui_react_1.Loader, { size: 'medium' }, "\u0141adowanie"))) : '',
                        React.createElement(semantic_ui_react_1.Item.Image, { src: this.state.profil.ImgPath }),
                        React.createElement(semantic_ui_react_1.Item.Content, null,
                            React.createElement(semantic_ui_react_1.Item.Header, null, this.state.profil.Title),
                            React.createElement(semantic_ui_react_1.Item.Meta, null,
                                React.createElement("span", { className: 'cinema' }, this.state.profil.Header)),
                            React.createElement(semantic_ui_react_1.Item.Description, { dangerouslySetInnerHTML: { __html: this.state.profil.Description } }),
                            React.createElement(semantic_ui_react_1.Item.Extra, null, this.state.profil.ProfileOptions.map(function (value) { return (React.createElement("span", { style: { display: 'block' } },
                                React.createElement("br", null),
                                React.createElement(semantic_ui_react_1.Label, null,
                                    " ",
                                    value.Title,
                                    React.createElement(semantic_ui_react_1.Rating, { icon: 'star', disabled: true, defaultRating: value.Value, maxRating: 10 })))); })))))),
            React.createElement(ContactForm_1.default, null)));
    };
    return About;
}(AboutService_1.default));
exports.default = About;
//# sourceMappingURL=About.js.map
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
var Contact = /** @class */ (function (_super) {
    __extends(Contact, _super);
    function Contact() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Contact.prototype.render = function () {
        return (React.createElement(semantic_ui_react_1.Grid.Column, null,
            React.createElement("div", { style: {
                    backgroundColor: 'black',
                    color: 'white'
                } }, "Kontakt"),
            React.createElement(semantic_ui_react_1.Card, { fluid: true },
                React.createElement(semantic_ui_react_1.Card.Content, null,
                    React.createElement(semantic_ui_react_1.Image, { floated: 'right', size: 'mini', src: 'https://react.semantic-ui.com/assets/images/avatar/large/steve.jpg' }),
                    React.createElement(semantic_ui_react_1.Card.Header, null, "Damian St\u0119pniak"),
                    React.createElement(semantic_ui_react_1.Card.Meta, null, "damianos-11@o2.pl"),
                    React.createElement(semantic_ui_react_1.Card.Description, null, "Je\u015Bli masz pytania skontaktuj si\u0119 ze mn\u0105")))));
    };
    return Contact;
}(React.Component));
exports.default = Contact;
//# sourceMappingURL=Contact.js.map
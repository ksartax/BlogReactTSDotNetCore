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
var Config_1 = require("../../ApiConfig/Config");
var ContactForm = /** @class */ (function (_super) {
    __extends(ContactForm, _super);
    function ContactForm(props) {
        var _this = _super.call(this, props) || this;
        _this.config = new Config_1.default();
        _this.state = {
            firstName: "",
            email: "",
            description: "",
            loaderSend: false,
            sendStatus: 0
        };
        _this.handleSubmit.bind(_this);
        _this.handleInput.bind(_this);
        return _this;
    }
    ContactForm.prototype.handleSubmit = function () {
        var context = this;
        context.setState({
            loaderSend: true
        });
        var contact = {
            FirstName: this.state.firstName,
            Email: this.state.email,
            Description: this.state.description
        };
        this.config.post("Contact/Send", contact)
            .then(function (response) {
            return response.json();
        })
            .then(function (response) {
            context.setState({
                loaderSend: false
            });
            if (response.code != 200) {
                context.setState({
                    sendStatus: -1
                });
                return;
            }
            context.setState({
                sendStatus: 1
            });
        })
            .catch(function (err) {
            console.log(err);
        });
    };
    ContactForm.prototype.handleInput = function (event) {
        this.setState((_a = {},
            _a[event.target.name] = event.target.value,
            _a));
        var _a;
    };
    ContactForm.prototype.render = function () {
        return (React.createElement(semantic_ui_react_1.Card, { fluid: true, raised: true, style: { marginTop: '4em' } },
            this.state.loaderSend == true ? (React.createElement(semantic_ui_react_1.Dimmer, { active: true, inverted: true },
                React.createElement(semantic_ui_react_1.Loader, { size: 'medium' }, "Wysy\u0142anie"))) : '',
            this.state.sendStatus == 1 ? (React.createElement(semantic_ui_react_1.Message, { positive: true },
                React.createElement(semantic_ui_react_1.Message.Header, null, "Pomy\u015Blnie wys\u0142ano wiadomo\u015B\u0107"))) : this.state.sendStatus == -1 ? (React.createElement(semantic_ui_react_1.Message, { negative: true },
                React.createElement(semantic_ui_react_1.Message.Header, null, "B\u0142\u0105d podczas wysy\u0142ania wiadomosci, sproboj ponownie lub wy\u015Blij na email"))) : '',
            React.createElement(semantic_ui_react_1.Card.Content, null,
                React.createElement(semantic_ui_react_1.Card.Header, null, "Formularz kontaktowy"),
                React.createElement("hr", null),
                React.createElement(semantic_ui_react_1.Card.Description, null,
                    React.createElement(semantic_ui_react_1.Form, { onSubmit: this.handleSubmit.bind(this) },
                        React.createElement(semantic_ui_react_1.Form.Group, { widths: 'equal' },
                            React.createElement(semantic_ui_react_1.Form.Input, { placeholder: 'Imie', name: 'firstName', label: 'Imie', value: this.state.firstName, onChange: this.handleInput.bind(this), required: true }),
                            React.createElement(semantic_ui_react_1.Form.Input, { placeholder: 'Email', name: 'email', label: 'Email', value: this.state.email, onChange: this.handleInput.bind(this), required: true, type: 'email' })),
                        React.createElement(semantic_ui_react_1.Form.TextArea, { placeholder: 'Wiadomość', name: 'description', label: 'Wiadomość', value: this.state.description, onChange: this.handleInput.bind(this), required: true }),
                        React.createElement(semantic_ui_react_1.Button, { type: 'submit' }, "Wy\u015Blij"))))));
    };
    return ContactForm;
}(React.Component));
exports.default = ContactForm;
//# sourceMappingURL=ContactForm.js.map
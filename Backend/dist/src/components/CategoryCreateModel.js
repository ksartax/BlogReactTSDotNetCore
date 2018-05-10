"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const semantic_ui_react_1 = require("semantic-ui-react");
const Config_1 = require("../../ApiConfig/Config");
const Category_1 = require("../model/Category");
class CategoryCreateModel extends React.Component {
    constructor(props) {
        super(props);
        this.config = new Config_1.default();
        this.state = {
            Title: "",
            Description: "",
            UrlTitle: "",
            loaderCategory: false,
            sendStatus: 0
        };
        this.handleSubmit.bind(this);
    }
    handleSubmit() {
        let context = this;
        context.setState({
            loaderCategory: true
        });
        let category = new Category_1.CategoryCreate(this.state.Title, this.state.Description, this.state.UrlTitle);
        this.config.post("Category/Add", category)
            .then(function (response) {
            return response.json();
        })
            .then(function (response) {
            context.setState({
                loaderCategory: false,
            });
            if (response.code != 200) {
                context.setState({
                    sendStatus: -1
                });
                return;
            }
            context.props.categories.loadCategory(1);
            context.setState({
                sendStatus: 1
            });
        })
            .catch(function (err) {
            console.log(err);
        });
    }
    render() {
        return (React.createElement(semantic_ui_react_1.Modal, { trigger: React.createElement(semantic_ui_react_1.Button, null, "Dodaj") },
            React.createElement(semantic_ui_react_1.Modal.Header, null, "Dodawanie Kategorii"),
            React.createElement(semantic_ui_react_1.Modal.Content, { image: true },
                React.createElement(semantic_ui_react_1.Modal.Description, null,
                    React.createElement(semantic_ui_react_1.Segment, { stacked: true },
                        this.state.loaderCategory == true ? (React.createElement(semantic_ui_react_1.Dimmer, { active: true, inverted: true },
                            React.createElement(semantic_ui_react_1.Loader, { size: 'medium' }, "\u0141adowanie"))) : '',
                        this.state.sendStatus == 1 ? (React.createElement(semantic_ui_react_1.Message, { positive: true },
                            React.createElement(semantic_ui_react_1.Message.Header, null, "Pomy\u015Blnie dodano kategorie"))) : this.state.sendStatus == -1 ? (React.createElement(semantic_ui_react_1.Message, { negative: true },
                            React.createElement(semantic_ui_react_1.Message.Header, null, "B\u0142\u0105d podczas akcji"))) : '',
                        React.createElement(semantic_ui_react_1.Form, { onSubmit: this.handleSubmit.bind(this) },
                            React.createElement(semantic_ui_react_1.Form.Input, { name: 'firstName', label: "Tytul", value: this.state.Title, required: true, onChange: (value) => {
                                    this.setState({
                                        Title: value.currentTarget.value
                                    });
                                } }),
                            React.createElement(semantic_ui_react_1.Form.Input, { name: 'urlTitle', label: "Tytul url", value: this.state.UrlTitle, required: true, onChange: (value) => {
                                    this.setState({
                                        UrlTitle: value.currentTarget.value
                                    });
                                } }),
                            React.createElement(semantic_ui_react_1.Form.TextArea, { name: 'description', value: this.state.Description, label: "Komentarz", onChange: (value) => {
                                    this.setState({
                                        Description: value.currentTarget.value
                                    });
                                } }),
                            React.createElement(semantic_ui_react_1.Button, { content: 'Dodaj', labelPosition: 'left', icon: 'edit', primary: true })))))));
    }
}
exports.default = CategoryCreateModel;
//# sourceMappingURL=CategoryCreateModel.js.map
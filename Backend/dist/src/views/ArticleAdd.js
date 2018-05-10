"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const semantic_ui_react_1 = require("semantic-ui-react");
const react_wysiwyg_typescript_1 = require("react-wysiwyg-typescript");
const draft_js_1 = require("draft-js");
const Config_1 = require("../../ApiConfig/Config");
const Article_1 = require("../model/Article");
const ArticleViewModel_1 = require("../components/ArticleViewModel");
class SelectEntity {
    constructor(Key, Value, Text) {
        this.key = Key;
        this.value = Value;
        this.text = Text;
    }
}
class ArticleAdd extends React.Component {
    constructor(props) {
        super(props);
        this.config = new Config_1.default();
        this.state = {
            editorState: draft_js_1.EditorState.createEmpty(),
            title: "",
            urlTitle: "",
            file: {
                name: ""
            },
            categorys: Array(),
            categories: Array(),
            loaderArticles: false,
            sendStatus: 0,
            editText: ""
        };
        this.selectGroup = (event, data) => {
            this.setState({ categories: data.value });
        };
        this.addArticle.bind(this);
        this.handleInput.bind(this);
    }
    componentDidMount() {
        this.loadCategory();
    }
    handleInput(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    loadCategory() {
        let context = this;
        this.config.get("Category?page=1&limit=100")
            .then(function (response) {
            return response.json();
        })
            .then(function (response) {
            if (response.code != 200) {
                return;
            }
            let _categories = new Array();
            let responseData = response.responseData;
            for (let po of responseData.items) {
                _categories.push(new SelectEntity(po.id, po.id, po.title));
            }
            context.setState({
                categorys: _categories
            });
        })
            .catch(function (err) {
            console.log(err);
        });
    }
    addArticle() {
        let context = this;
        let article = new Article_1.ArticleCreate(this.state.title, react_wysiwyg_typescript_1.draftToHtml(draft_js_1.convertToRaw(this.state.editorState.getCurrentContent())), this.state.urlTitle);
        article.Images.push(new Article_1.Image(this.state.file.name));
        article.Categories = this.state.categories;
        context.setState({
            loaderArticles: true
        });
        this.config.post("Article/Add", article)
            .then(function (response) {
            return response.json();
        })
            .then(function (response) {
            context.setState({
                loaderArticles: false
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
    }
    addImg(file) {
        let context = this;
        var f = new FormData();
        f.append("File", file);
        this.config.postWithMultiple("File/Upload", f)
            .then(function (response) {
            return response.json();
        })
            .then(function (response) {
            if (response.code != 200) {
                return;
            }
            context.setState({
                file: {
                    name: response.responseData.source
                }
            });
        })
            .catch(function (err) {
            console.log(err);
        });
    }
    render() {
        const { editorState } = this.state;
        return (React.createElement(semantic_ui_react_1.Segment, { stacked: true },
            this.state.loaderArticles == true ? (React.createElement(semantic_ui_react_1.Dimmer, { active: true, inverted: true },
                React.createElement(semantic_ui_react_1.Loader, { size: 'medium' }, "\u0141adowanie"))) : '',
            this.state.sendStatus == 1 ? (React.createElement(semantic_ui_react_1.Message, { positive: true },
                React.createElement(semantic_ui_react_1.Message.Header, null, "Pomy\u015Blnie dodano artko\u0142"))) : this.state.sendStatus == -1 ? (React.createElement(semantic_ui_react_1.Message, { negative: true },
                React.createElement(semantic_ui_react_1.Message.Header, null, "B\u0142\u0105d podczas akcji"))) : '',
            React.createElement(semantic_ui_react_1.Grid, { columns: 4, stackable: true, textAlign: "left" },
                React.createElement(semantic_ui_react_1.Grid.Row, null,
                    React.createElement(semantic_ui_react_1.Grid.Column, null,
                        React.createElement(semantic_ui_react_1.Input, { name: 'title', label: "Tytul: ", value: this.state.title, onChange: this.handleInput.bind(this), placeholder: 'Tytuł' })),
                    React.createElement(semantic_ui_react_1.Grid.Column, null,
                        React.createElement("label", { htmlFor: 'img', className: "ui icon button" },
                            React.createElement("i", { className: "upload icon" }),
                            "Zdj\u0119cie"),
                        React.createElement("input", { type: "file", id: 'img', style: { display: "none" }, onChange: (input) => {
                                this.addImg(input.target.files[0]);
                            } }),
                        React.createElement(semantic_ui_react_1.Label, null, this.state.file.name)),
                    React.createElement(semantic_ui_react_1.Grid.Column, null,
                        React.createElement(semantic_ui_react_1.Input, { name: 'urlTitle', label: "Ulr: ", value: this.state.urlTitle, onChange: this.handleInput.bind(this), placeholder: 'Tytuł' })),
                    React.createElement(semantic_ui_react_1.Grid.Column, null,
                        React.createElement(semantic_ui_react_1.Dropdown, { placeholder: 'Kategoria', options: this.state.categorys, selection: true, multiple: true, onChange: this.selectGroup })))),
            React.createElement(react_wysiwyg_typescript_1.default, { editorState: editorState, onEditorStateChange: (editorState) => { this.setState({ editorState, editText: react_wysiwyg_typescript_1.draftToHtml(draft_js_1.convertToRaw(editorState.getCurrentContent())) }); } }),
            React.createElement("div", null),
            React.createElement(semantic_ui_react_1.TextArea, { value: this.state.editText, onChange: (value) => {
                    this.setState({
                        editText: value.currentTarget.value
                    });
                } }),
            React.createElement("div", null),
            React.createElement(semantic_ui_react_1.Button, { content: "Edytuj", onClick: () => {
                    this.setState({
                        editorState: react_wysiwyg_typescript_1.htmlToDraft(this.state.editText)
                    });
                } }),
            React.createElement("div", null),
            React.createElement("hr", null),
            React.createElement(ArticleViewModel_1.default, { article: new Article_1.ArticleView(0, this.state.title, react_wysiwyg_typescript_1.draftToHtml(draft_js_1.convertToRaw(this.state.editorState.getCurrentContent())), null, Config_1.default.API_FILE + this.state.file.name, this.state.urlTitle) }),
            React.createElement(semantic_ui_react_1.Button, { primary: true, onClick: this.addArticle.bind(this) }, "Dodaj")));
    }
}
exports.default = ArticleAdd;
//# sourceMappingURL=ArticleAdd.js.map
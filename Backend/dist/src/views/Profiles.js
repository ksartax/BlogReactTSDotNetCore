"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const semantic_ui_react_1 = require("semantic-ui-react");
const Config_1 = require("../../ApiConfig/Config");
const Profil_1 = require("../model/Profil");
const ProfilViewModel_1 = require("../components/ProfilViewModel");
const react_wysiwyg_typescript_1 = require("react-wysiwyg-typescript");
const draft_js_1 = require("draft-js");
class Profiles extends React.Component {
    constructor(props) {
        super(props);
        this.config = new Config_1.default();
        this.state = {
            profil: new Profil_1.ProfilUpdate(),
            saveProfiles: false,
            loadProfil: true,
            profilOption: new Profil_1.ProfileOptionUpdate(),
            editorState: draft_js_1.EditorState.createEmpty(),
            editText: "",
            imgPath: ""
        };
        this.addProfil.bind(this);
    }
    componentDidMount() {
        this.loadProfiles();
    }
    loadProfiles() {
        let context = this;
        this.config.get("Profile?page=1")
            .then(function (response) {
            return response.json();
        })
            .then(function (response) {
            context.setState({
                loadProfil: false
            });
            if (response.code != 200) {
                return;
            }
            let responseData = response.responseData.items[0];
            let _profil = new Profil_1.ProfilUpdate(responseData.title, responseData.description, responseData.imgPath, responseData.header);
            for (let po of responseData.options) {
                _profil.addProfileOption(new Profil_1.ProfileOptionUpdate(po.title, po.value));
            }
            context.setState({
                profil: _profil,
                editorState: react_wysiwyg_typescript_1.htmlToDraft(_profil.Description),
                editText: react_wysiwyg_typescript_1.draftToHtml(_profil.Description)
            });
        })
            .catch(function (err) {
            console.log(err);
        });
    }
    addProfil() {
        let context = this;
        context.setState({
            saveProfiles: true
        });
        this.config.post("Profile/Add", context.state.profil)
            .then(function (response) {
            return response.json();
        })
            .then(function (response) {
            context.setState({
                saveProfiles: false
            });
            if (response.code != 200) {
                return;
            }
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
            var profil = context.state.profil;
            profil.setImgPath(response.responseData.source);
            context.setState({
                profil: profil
            });
        })
            .catch(function (err) {
            console.log(err);
        });
    }
    render() {
        const { editorState } = this.state;
        return (React.createElement(semantic_ui_react_1.Segment, { stacked: true },
            React.createElement(semantic_ui_react_1.Item.Group, { relaxed: true },
                React.createElement(semantic_ui_react_1.Item, null,
                    this.state.saveProfiles || this.state.loadProfil == true ? (React.createElement(semantic_ui_react_1.Dimmer, { active: true, inverted: true },
                        React.createElement(semantic_ui_react_1.Loader, { size: 'medium' }, "\u0141adowanie"))) : '',
                    React.createElement(semantic_ui_react_1.Item.Image, { src: this.state.profil.ImgPathView }),
                    React.createElement("div", null),
                    React.createElement("span", null,
                        React.createElement("label", { htmlFor: 'img', style: {
                                width: "70px"
                            }, className: "ui icon button" },
                            React.createElement("i", { className: "upload icon" }),
                            "Zdj\u0119cie"),
                        React.createElement("input", { type: "file", id: 'img', style: { display: "none" }, onChange: (input) => {
                                this.addImg(input.target.files[0]);
                            } })),
                    React.createElement(semantic_ui_react_1.Item.Content, null,
                        React.createElement(semantic_ui_react_1.Item.Header, null,
                            React.createElement(semantic_ui_react_1.Input, { type: "text", value: this.state.profil.Title, onChange: (event) => {
                                    var updated = this.state.profil;
                                    updated.Title = event.currentTarget.value;
                                    this.setState({
                                        profil: updated
                                    });
                                } })),
                        React.createElement(semantic_ui_react_1.Item.Meta, null,
                            React.createElement("span", { className: 'cinema' },
                                React.createElement(semantic_ui_react_1.Input, { value: this.state.profil.Header, onChange: (event) => {
                                        var updated = this.state.profil;
                                        updated.Header = event.currentTarget.value;
                                        this.setState({
                                            profil: updated
                                        });
                                    } }))),
                        React.createElement(semantic_ui_react_1.Item.Description, null,
                            React.createElement(react_wysiwyg_typescript_1.default, { editorState: editorState, onEditorStateChange: (editorState) => {
                                    var updated = this.state.profil;
                                    this.setState({ editorState });
                                    updated.Description = react_wysiwyg_typescript_1.draftToHtml(draft_js_1.convertToRaw(editorState.getCurrentContent()));
                                    this.setState({
                                        profil: updated,
                                        editText: updated.Description
                                    });
                                } }),
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
                                } })),
                        React.createElement(semantic_ui_react_1.Item.Extra, null,
                            this.state.profil.Options.map((value) => (React.createElement("span", { style: { display: 'block' } },
                                React.createElement("br", null),
                                React.createElement(semantic_ui_react_1.Label, null,
                                    " ",
                                    value.Title,
                                    React.createElement(semantic_ui_react_1.Rating, { icon: 'star', disabled: true, defaultRating: value.Value, maxRating: 10 })),
                                React.createElement(semantic_ui_react_1.Button, { negative: true, onClick: () => {
                                        var updated = this.state.profil;
                                        updated.removeProfileOption(value);
                                        this.setState({
                                            profil: updated
                                        });
                                    } }, "Wykasuj")))),
                            React.createElement(semantic_ui_react_1.Input, { value: this.state.profilOption.Title, onChange: (event) => {
                                    var updated = this.state.profilOption;
                                    updated.Title = event.currentTarget.value;
                                    this.setState({
                                        profilOption: updated
                                    });
                                } }),
                            React.createElement(semantic_ui_react_1.Input, { value: this.state.profilOption.Value, onChange: (event) => {
                                    var updated = this.state.profilOption;
                                    updated.Value = event.currentTarget.value;
                                    this.setState({
                                        profilOption: updated
                                    });
                                } }),
                            React.createElement(semantic_ui_react_1.Button, { primary: true, onClick: () => {
                                    var updated = this.state.profil;
                                    var oldProfilOption = this.state.profilOption;
                                    updated.addProfileOption(oldProfilOption);
                                    this.setState({
                                        profil: updated,
                                        profilOption: new Profil_1.ProfileOptionUpdate(oldProfilOption.Title, oldProfilOption.Value)
                                    });
                                } }, "Dodaj"))))),
            React.createElement(ProfilViewModel_1.default, { profil: this.state.profil }),
            React.createElement(semantic_ui_react_1.Button, { primary: true, onClick: this.addProfil.bind(this) }, " Edutuj ")));
    }
}
exports.default = Profiles;
//# sourceMappingURL=Profiles.js.map
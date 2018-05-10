"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const semantic_ui_react_1 = require("semantic-ui-react");
class ProfilViewModel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (React.createElement(semantic_ui_react_1.Modal, { trigger: React.createElement(semantic_ui_react_1.Button, null, "Podgl\u0105d") },
            React.createElement(semantic_ui_react_1.Modal.Header, null, "Profil podgl\u0105dowy"),
            React.createElement(semantic_ui_react_1.Modal.Content, { image: true },
                React.createElement(semantic_ui_react_1.Modal.Description, null,
                    React.createElement(semantic_ui_react_1.Segment, null,
                        React.createElement(semantic_ui_react_1.Item.Group, { relaxed: true },
                            React.createElement(semantic_ui_react_1.Item, null,
                                React.createElement(semantic_ui_react_1.Item.Image, { src: this.props.profil.ImgPathView }),
                                React.createElement(semantic_ui_react_1.Item.Content, null,
                                    React.createElement(semantic_ui_react_1.Item.Header, null, this.props.profil.Title),
                                    React.createElement(semantic_ui_react_1.Item.Meta, null,
                                        React.createElement("span", { className: 'cinema' }, this.props.profil.Header)),
                                    React.createElement(semantic_ui_react_1.Item.Description, { dangerouslySetInnerHTML: { __html: this.props.profil.Description } }),
                                    React.createElement(semantic_ui_react_1.Item.Extra, null, this.props.profil.Options.map((value) => (React.createElement("span", { style: { display: 'block' } },
                                        React.createElement("br", null),
                                        React.createElement(semantic_ui_react_1.Label, null,
                                            " ",
                                            value.Title,
                                            React.createElement(semantic_ui_react_1.Rating, { icon: 'star', disabled: true, defaultRating: value.Value, maxRating: 10 }))))))))))))));
    }
}
exports.default = ProfilViewModel;
//# sourceMappingURL=ProfilViewModel.js.map
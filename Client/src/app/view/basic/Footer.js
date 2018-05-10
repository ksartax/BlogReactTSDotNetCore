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
var ElementPost_1 = require("../components/ElementPost");
var Post_1 = require("../../model/Post");
var Contact_1 = require("../components/Contact");
var Config_1 = require("../../ApiConfig/Config");
var Footer = /** @class */ (function (_super) {
    __extends(Footer, _super);
    function Footer(props) {
        var _this = _super.call(this, props) || this;
        _this.config = new Config_1.default();
        _this.state = {
            posts: new Array(),
            loaderPosts: true
        };
        return _this;
    }
    Footer.prototype.componentDidMount = function () {
        this.loadPosts();
    };
    Footer.prototype.loadPosts = function () {
        var context = this;
        this.config.get("Article?page=1&limit=2&sort=asc")
            .then(function (response) {
            return response.json();
        })
            .then(function (response) {
            console.log(response);
            if (response.code != 200) {
                return;
            }
            console.log(response);
            var _posts = new Array();
            var responseData = response.responseData.items;
            for (var _i = 0, responseData_1 = responseData; _i < responseData_1.length; _i++) {
                var po = responseData_1[_i];
                var _post = new Post_1.default(po.id, po.title, po.description, po.date, po.image.path, po.titleUrl);
                _posts.push(_post);
            }
            context.setState({
                posts: _posts,
                loaderPosts: false
            });
        })
            .catch(function (err) {
            console.log(err);
        });
    };
    Footer.prototype.render = function () {
        return (React.createElement("div", { style: { marginTop: '4em' } },
            React.createElement("hr", null),
            React.createElement(semantic_ui_react_1.Grid, { columns: 2, textAlign: 'center', style: { marginTop: '2em' }, container: true, stackable: true },
                React.createElement(semantic_ui_react_1.Grid.Column, null,
                    React.createElement("div", { style: {
                            backgroundColor: 'black',
                            color: 'white'
                        } }, "Dawne artyku\u0142y"),
                    React.createElement(semantic_ui_react_1.Item.Group, null,
                        this.state.loaderPosts == true ? (React.createElement(semantic_ui_react_1.Dimmer, { active: true, inverted: true },
                            React.createElement(semantic_ui_react_1.Loader, { size: 'medium' }, "\u0141adowanie"))) : '',
                        this.state.posts.map(function (value) { return (React.createElement(ElementPost_1.ElementPostItem, { post: value })); }))),
                React.createElement(Contact_1.default, null)),
            React.createElement("div", { style: { marginTop: '5em', textAlign: 'center' } }, "\u00A9 Created at Damian St\u0119pniak 2018")));
    };
    return Footer;
}(React.Component));
exports.default = Footer;
//# sourceMappingURL=Footer.js.map
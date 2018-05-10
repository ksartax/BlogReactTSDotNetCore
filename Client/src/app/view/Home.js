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
var FeaturedPost_1 = require("./components/FeaturedPost");
var ElementPost_1 = require("./components/ElementPost");
var HomeService_1 = require("../service/HomeService");
var Home = /** @class */ (function (_super) {
    __extends(Home, _super);
    function Home() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Home.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", null,
            React.createElement(semantic_ui_react_1.Grid, { columns: 1, relaxed: true, stackable: true, style: { backgroundColor: 'black', marginLeft: '-1.0rem' } },
                React.createElement(semantic_ui_react_1.Grid.Column, null,
                    this.state.loaderNewPost == true ? (React.createElement(semantic_ui_react_1.Dimmer, { active: true, inverted: true },
                        React.createElement(semantic_ui_react_1.Loader, { size: 'medium' }, "\u0141adowanie"))) : '',
                    React.createElement(FeaturedPost_1.default, { post: this.state.postNew }))),
            this.state.totalArticle == 0 ? (React.createElement(semantic_ui_react_1.Message, { warning: true },
                React.createElement(semantic_ui_react_1.Message.Header, null, "Brak Artyku\u0142\u00F3w"))) : '',
            React.createElement(semantic_ui_react_1.Select, { defaultValue: this.state.sort, style: { float: 'right' }, placeholder: 'Select your country', options: [
                    { key: 'DESC', value: 'DESC', text: 'Sortuj od najnowszych' },
                    { key: 'ASC', value: 'ASC', text: 'Sortuj od najstarszych' }
                ], onChange: this.selectSort }),
            React.createElement("hr", null),
            React.createElement(semantic_ui_react_1.Grid, { columns: 2, container: true, stackable: true, style: { minHeight: '300px' } },
                React.createElement(semantic_ui_react_1.Grid.Column, { style: { paddingLeft: '0rem' } },
                    this.state.loaderPosts == true ? (React.createElement(semantic_ui_react_1.Dimmer, { active: true, inverted: true },
                        React.createElement(semantic_ui_react_1.Loader, { size: 'medium' }, "\u0141adowanie"))) : '',
                    this.state.postsRight.map(function (value) { return (React.createElement(ElementPost_1.ElementPostCart, { post: value })); })),
                React.createElement(semantic_ui_react_1.Grid.Column, null,
                    this.state.loaderPosts == true ? (React.createElement(semantic_ui_react_1.Dimmer, { active: true, inverted: true },
                        React.createElement(semantic_ui_react_1.Loader, { size: 'medium' }, "\u0141adowanie"))) : '',
                    this.state.postsLeft.map(function (value) { return (React.createElement(ElementPost_1.ElementPostCart, { post: value })); }))),
            React.createElement("hr", null),
            React.createElement(semantic_ui_react_1.Menu, { floated: 'right', pagination: true },
                React.createElement(semantic_ui_react_1.Menu.Item, { as: 'a', disabled: this.state.pageIndex == 1 || this.state.totalPage == 0, icon: true, onClick: function () {
                        _this.loadPosts(--_this.state.pageIndex, _this.state.urlCategory);
                    } },
                    React.createElement(semantic_ui_react_1.Icon, { name: 'chevron left' })),
                React.createElement(semantic_ui_react_1.Menu.Item, { as: 'a', icon: true, disabled: this.state.pageIndex == this.state.totalPage || this.state.totalPage == 0, onClick: function () {
                        _this.loadPosts(++_this.state.pageIndex, _this.state.urlCategory);
                    } },
                    React.createElement(semantic_ui_react_1.Icon, { name: 'chevron right' })))));
    };
    return Home;
}(HomeService_1.default));
exports.default = Home;
//# sourceMappingURL=Home.js.map
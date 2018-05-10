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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_router_dom_1 = require("react-router-dom");
var semantic_ui_react_1 = require("semantic-ui-react");
var createBrowserHistory_1 = require("history/createBrowserHistory");
var Category_1 = require("../model/Category");
var Home_1 = require("../view/Home");
var About_1 = require("../view/About");
var PostView_1 = require("../view/PostView");
var Footer_1 = require("../view/basic/Footer");
var NotFound_1 = require("../view/basic/NotFound");
var Config_1 = require("../ApiConfig/Config");
var Layout = /** @class */ (function (_super) {
    __extends(Layout, _super);
    function Layout(props) {
        var _this = _super.call(this, props) || this;
        _this.config = new Config_1.default();
        _this.state = {
            activeLink: window.location.pathname,
            categorys: Array()
        };
        _this.changeLinkActive = function (name) {
            _this.setState({
                activeLink: name
            });
        };
        _this.changeLinkActive.bind(_this);
        return _this;
    }
    Layout.prototype.render = function () {
        var history = createBrowserHistory_1.default();
        return (React.createElement(react_router_dom_1.Router, { history: history },
            React.createElement(semantic_ui_react_1.Grid, { columns: 2, stackable: true, divided: false, style: { marginTop: '0px' } },
                React.createElement(semantic_ui_react_1.Grid.Column, { computer: '4', style: {
                        backgroundImage: "url('http://2.bp.blogspot.com/-hZXRNdtcHBM/WMVliQpFi-I/AAAAAAAABrU/C3LmH9wsQdwF3b7obdz3ttAky2m0U0bIQCK4B/s0/compressed+bg.jpg')",
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center center',
                        opacity: '0.8'
                    } },
                    React.createElement("div", null,
                        React.createElement(semantic_ui_react_1.Menu, { vertical: true, fluid: true },
                            React.createElement(react_router_dom_1.NavLink, { exact: true, activeClassName: 'activeL', to: "/" },
                                React.createElement(semantic_ui_react_1.Menu.Item, { link: true }, "Strona g\u0142\u00F3wna")),
                            React.createElement(react_router_dom_1.NavLink, { activeClassName: 'activeL', to: "/o-mnie" },
                                React.createElement(semantic_ui_react_1.Menu.Item, { link: true }, "O mnie"))),
                        React.createElement(NavCategory, null),
                        React.createElement(SearchComponent, { history: history }))),
                React.createElement(semantic_ui_react_1.Grid.Column, { computer: '12', style: {
                        overflow: 'scroll',
                        height: '100vh',
                        overflowX: 'hidden'
                    }, id: 'main-div' },
                    React.createElement("div", null,
                        React.createElement(ScrollToTop, null,
                            React.createElement(react_router_dom_1.Switch, null,
                                React.createElement(react_router_dom_1.Route, { exact: true, path: "/", component: Home_1.default }),
                                React.createElement(react_router_dom_1.Route, { exact: true, path: "/o-mnie", component: About_1.default }),
                                React.createElement(react_router_dom_1.Route, { exact: true, path: "/view/:use", component: PostView_1.default }),
                                React.createElement(react_router_dom_1.Route, { exact: true, path: "/category/:url", component: Home_1.default }),
                                React.createElement(react_router_dom_1.Route, { exact: true, component: NotFound_1.default })))),
                    React.createElement("div", null,
                        React.createElement(Footer_1.default, null))))));
    };
    return Layout;
}(React.Component));
exports.default = Layout;
var ScrollToTop = /** @class */ (function (_super) {
    __extends(ScrollToTop, _super);
    function ScrollToTop() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ScrollToTop.prototype.componentDidUpdate = function (prevProps) {
        var myDiv = document.getElementById('main-div');
        if (myDiv != null) {
            myDiv.scrollTop = 0;
        }
    };
    ScrollToTop.prototype.render = function () {
        return this.props.children;
    };
    return ScrollToTop;
}(React.Component));
var NavCategory = /** @class */ (function (_super) {
    __extends(NavCategory, _super);
    function NavCategory() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = new Config_1.default();
        _this.state = {
            categorys: Array()
        };
        return _this;
    }
    NavCategory.prototype.componentDidMount = function () {
        this.loadCategory();
    };
    NavCategory.prototype.loadCategory = function () {
        var context = this;
        this.config.get("Category?page=1")
            .then(function (response) {
            return response.json();
        })
            .then(function (response) {
            if (response.code != 200) {
                return;
            }
            var _categories = new Array();
            var responseData = response.responseData;
            for (var _i = 0, _a = responseData.items; _i < _a.length; _i++) {
                var po = _a[_i];
                _categories.push(new Category_1.default(po.id, po.title, po.urlTitle));
            }
            context.setState({
                categorys: _categories
            });
        })
            .catch(function (err) {
            console.log(err);
        });
    };
    NavCategory.prototype.render = function () {
        return React.createElement(semantic_ui_react_1.Menu, { vertical: true, fluid: true }, this.state.categorys.map(function (value) { return (React.createElement(react_router_dom_1.NavLink, { activeClassName: 'activeL', to: '/category/' + value.UrlTitle },
            React.createElement(semantic_ui_react_1.Menu.Item, { link: true }, value.Name))); }));
    };
    return NavCategory;
}(React.Component));
var SearchComponent = /** @class */ (function (_super) {
    __extends(SearchComponent, _super);
    function SearchComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = new Config_1.default();
        _this.state = {
            isLoading: false,
            value: '',
            results: [],
            timeout: 0
        };
        _this.handleResult = function (value) {
            _this.setState({ value: value.currentTarget.value });
            _this.searchPosts();
        };
        _this.handleResultSelect = function (e) {
            _this.props.history.push("/view/" + e.currentTarget.attributes.urltitle.value);
        };
        return _this;
    }
    SearchComponent.prototype.searchPosts = function () {
        var context = this;
        var _search = this.state.value;
        window.clearTimeout(context.state.timeout);
        var timeoutHandle = setTimeout(function () {
            context.config.get("Article/s/?s=" + _search)
                .then(function (response) {
                return response.json();
            })
                .then(function (response) {
                if (response.code != 200) {
                    return;
                }
                var _posts = new Array();
                var responseData = response.responseData;
                for (var _i = 0, responseData_1 = responseData; _i < responseData_1.length; _i++) {
                    var po = responseData_1[_i];
                    _posts.push({
                        "title": po.title,
                        "image": Config_1.default.API_FILE + po.image.path,
                        "urlTitle": po.titleUrl
                    });
                }
                context.setState({
                    results: _posts
                });
            })
                .catch(function (err) {
                console.log(err);
            });
        }, 2000);
        console.log(this.state.results);
        this.setState({
            timeout: timeoutHandle
        });
    };
    SearchComponent.prototype.render = function () {
        var _a = this.state, isLoading = _a.isLoading, value = _a.value, results = _a.results;
        return (React.createElement(semantic_ui_react_1.Grid, null,
            React.createElement(semantic_ui_react_1.Grid.Column, { width: 8 },
                React.createElement(semantic_ui_react_1.Search, __assign({ loading: isLoading, onResultSelect: this.handleResultSelect, onSearchChange: this.handleResult, results: results, value: value }, this.props)))));
    };
    return SearchComponent;
}(React.Component));
//# sourceMappingURL=_Layout.js.map
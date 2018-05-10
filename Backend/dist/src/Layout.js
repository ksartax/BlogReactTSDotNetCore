"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_router_dom_1 = require("react-router-dom");
const semantic_ui_react_1 = require("semantic-ui-react");
const cookie_storage_1 = require("cookie-storage");
const Home_1 = require("./views/Home");
const Articles_1 = require("./views/Articles");
const Categories_1 = require("./views/Categories");
const Coments_1 = require("./views/Coments");
const Profiles_1 = require("./views/Profiles");
const ArticleAdd_1 = require("./views/ArticleAdd");
const createBrowserHistory_1 = require("history/createBrowserHistory");
const Config_1 = require("../ApiConfig/Config");
const Auth = {
    cookieStorage: new cookie_storage_1.CookieStorage(),
    isAuthenticated: false,
    authenticate(cb, token) {
        this.isAuthenticated = true;
        this.cookieStorage.setItem('token', token);
        setTimeout(cb, 100);
    },
    signout(cb) {
        this.isAuthenticated = false;
        this.cookieStorage.removeItem('token');
        setTimeout(cb, 100);
    }
};
const Logout = react_router_dom_1.withRouter(({ history }) => Auth.isAuthenticated ? (React.createElement("p", null,
    React.createElement(semantic_ui_react_1.Button, { onClick: () => Auth.signout(() => history.push("/")) }, " Wyloguj "))) : (React.createElement("p", null)));
const Navigate = react_router_dom_1.withRouter(({ history }) => Auth.isAuthenticated ? (React.createElement(semantic_ui_react_1.Menu, { vertical: true, fluid: true },
    React.createElement(react_router_dom_1.NavLink, { exact: true, activeClassName: 'activeL', to: "/" },
        React.createElement(semantic_ui_react_1.Menu.Item, { link: true }, "Strona g\u0142\u00F3wna")),
    React.createElement(react_router_dom_1.NavLink, { activeClassName: 'activeL', to: "/articles" },
        React.createElement(semantic_ui_react_1.Menu.Item, { link: true }, "Artyku\u0142y")),
    React.createElement(react_router_dom_1.NavLink, { activeClassName: 'activeL', to: "/comments" },
        React.createElement(semantic_ui_react_1.Menu.Item, { link: true }, "Komentarze")),
    React.createElement(react_router_dom_1.NavLink, { activeClassName: 'activeL', to: "/category" },
        React.createElement(semantic_ui_react_1.Menu.Item, { link: true }, "Kategorie")),
    React.createElement(react_router_dom_1.NavLink, { activeClassName: 'activeL', to: "/profiles" },
        React.createElement(semantic_ui_react_1.Menu.Item, { link: true }, "Profil")),
    React.createElement(semantic_ui_react_1.Menu.Item, { link: true },
        React.createElement(Logout, null)))) : (React.createElement("p", null)));
class Layout extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            active: ""
        };
    }
    render() {
        const history = createBrowserHistory_1.default();
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
                        React.createElement(Navigate, null))),
                React.createElement(semantic_ui_react_1.Grid.Column, { computer: '12', style: {
                        overflow: 'scroll',
                        height: '100vh',
                        overflowX: 'hidden'
                    } },
                    React.createElement("div", null,
                        React.createElement(react_router_dom_1.Route, { path: "/login", component: Login }),
                        React.createElement(PrivateRoute, { component: Home_1.default, exact: true, path: "/" }),
                        React.createElement(PrivateRoute, { exact: true, path: "/articles", component: Articles_1.default }),
                        React.createElement(PrivateRoute, { exact: true, path: "/articles/Add", component: ArticleAdd_1.default }),
                        React.createElement(PrivateRoute, { exact: false, path: "/comments", component: Coments_1.default }),
                        React.createElement(PrivateRoute, { exact: false, path: "/category", component: Categories_1.default }),
                        React.createElement(PrivateRoute, { exact: false, path: "/profiles", component: Profiles_1.default })),
                    React.createElement("div", null,
                        React.createElement(Footer, null))))));
    }
}
exports.default = Layout;
class Login extends React.Component {
    constructor() {
        super(...arguments);
        this.config = new Config_1.default();
        this.state = {
            redirectToReferrer: false,
            error: false,
            open: true,
            password: "",
            username: ""
        };
        this.login = () => {
            let context = this;
            var _login = {
                password: this.state.password,
                username: this.state.username
            };
            this.config.postAuth("Auth", _login)
                .then(function (response) {
                return response.json();
            })
                .then(function (response) {
                if (response.code != 200) {
                    return;
                }
                Auth.authenticate(() => {
                    context.setState({ redirectToReferrer: true });
                }, response.token);
            })
                .catch(function (err) {
                context.setState({
                    error: true
                });
            });
        };
    }
    render() {
        const { from } = this.props.location.state || { from: { pathname: "/" } };
        const { redirectToReferrer } = this.state;
        if (redirectToReferrer) {
            return React.createElement(react_router_dom_1.Redirect, { to: from });
        }
        return (React.createElement(semantic_ui_react_1.Modal, { open: this.state.open },
            React.createElement(semantic_ui_react_1.Modal.Content, null,
                React.createElement("div", { className: 'login-form' },
                    React.createElement(semantic_ui_react_1.Grid, { textAlign: 'center', verticalAlign: 'middle' },
                        React.createElement(semantic_ui_react_1.Grid.Column, { style: { maxWidth: 450 } },
                            React.createElement(semantic_ui_react_1.Header, { as: 'h2', color: 'teal', textAlign: 'center' },
                                ' ',
                                "Logowanie do Backendu"),
                            React.createElement(semantic_ui_react_1.Form, { size: 'large' },
                                React.createElement(semantic_ui_react_1.Segment, { stacked: true },
                                    React.createElement(semantic_ui_react_1.Form.Input, { fluid: true, icon: 'user', iconPosition: 'left', placeholder: 'Username', onChange: (value) => {
                                            this.setState({
                                                username: value.currentTarget.value
                                            });
                                        } }),
                                    React.createElement(semantic_ui_react_1.Form.Input, { fluid: true, icon: 'lock', iconPosition: 'left', placeholder: 'Password', type: 'password', onChange: (value) => {
                                            this.setState({
                                                password: value.currentTarget.value
                                            });
                                        } }),
                                    React.createElement(semantic_ui_react_1.Button, { onClick: this.login, color: 'teal', fluid: true, size: 'large' }, "Zaloguj"))),
                            this.state.error ? React.createElement(semantic_ui_react_1.Message, { attached: 'bottom', warning: true }, "B\u0142\u0105d podczas logowanie, spr\u00F3boj ponownie") : ""))))));
    }
}
class PrivateRoute extends React.Component {
    render() {
        return (React.createElement(react_router_dom_1.Route, { exact: this.props.exact, path: this.props.path, render: props => Auth.isAuthenticated ? (React.createElement(this.props.component, Object.assign({}, props))) : (React.createElement(react_router_dom_1.Redirect, { to: {
                    pathname: "/login",
                    state: { from: props.location }
                } })) }));
    }
}
const Footer = () => (React.createElement("div", { style: { marginTop: '5em', textAlign: 'center' } }, "\u00A9 Created at Damian St\u0119pniak 2018"));
//# sourceMappingURL=Layout.js.map
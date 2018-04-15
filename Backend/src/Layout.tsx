import * as React from "react";
import { NavLink, Router, Route, Switch, Redirect, withRouter } from 'react-router-dom'
import { Menu, Grid, Modal, Header, Button, Form, Segment, Message } from 'semantic-ui-react'
import { CookieStorage } from 'cookie-storage';

import Home from "./views/Home";
import Articles from "./views/Articles";
import Categories from "./views/Categories";
import Coments from "./views/Coments";
import Profiles from "./views/Profiles";
import ArticleAdd from "./views/ArticleAdd";
import createBrowserHistory from 'history/createBrowserHistory';
import { Component } from "react";

import Config from '../ApiConfig/Config';

const Auth = {

    cookieStorage: new CookieStorage(),

    isAuthenticated: false,
    authenticate(cb: any, token: any) {
        this.isAuthenticated = true;
        this.cookieStorage.setItem('token', token);
        setTimeout(cb, 100);
    },
    signout(cb: any) {
        this.isAuthenticated = false;
        this.cookieStorage.removeItem('token');
        setTimeout(cb, 100);
    }
};

const Logout = withRouter(
    ({ history }) =>
        Auth.isAuthenticated ? (
            <p>
                <Button onClick={() => Auth.signout(() => history.push("/"))}> Wyloguj </Button>
            </p>
        ) : (
                <p></p>
            )
);

const Navigate = withRouter(
    ({ history }) =>
        Auth.isAuthenticated ? (
            <Menu vertical fluid>

                <NavLink exact activeClassName='activeL' to="/">
                    <Menu.Item link>
                        Strona główna
                    </Menu.Item>
                </NavLink>

                <NavLink activeClassName='activeL' to="/articles">
                    <Menu.Item link>
                        Artykuły
                    </Menu.Item>
                </NavLink>

                <NavLink activeClassName='activeL' to="/comments">
                    <Menu.Item link>
                        Komentarze
                    </Menu.Item>
                </NavLink>

                <NavLink activeClassName='activeL' to="/category">
                    <Menu.Item link>
                        Kategorie
                    </Menu.Item>
                </NavLink>

                <NavLink activeClassName='activeL' to="/profiles">
                    <Menu.Item link>
                        Profil
                    </Menu.Item>
                </NavLink>

                <Menu.Item link>
                    <Logout />
                </Menu.Item>

            </Menu>
        ) : (
                <p></p>
            )
);

export default class Layout extends React.Component<{},{}>
{
    state = {
        active: ""
    }

    render() {
        const history = createBrowserHistory()

        return (
            <Router history={history}>
                <Grid columns={2} stackable divided={false} style={{ marginTop: '0px' }}>
                    <Grid.Column computer='4' style={{
                        backgroundImage: "url('http://2.bp.blogspot.com/-hZXRNdtcHBM/WMVliQpFi-I/AAAAAAAABrU/C3LmH9wsQdwF3b7obdz3ttAky2m0U0bIQCK4B/s0/compressed+bg.jpg')",
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center center',
                        opacity: '0.8'
                    }}>
                        <div>
                            <Navigate/>
                        </div>
                    </Grid.Column>

                    <Grid.Column computer='12' style={{
                        overflow: 'scroll',
                        height: '100vh',
                        overflowX: 'hidden'
                    }}>
                        <div>
                            <Route path="/login" component={Login} />

                            <PrivateRoute component={Home} exact={true} path="/" />
                            <PrivateRoute exact={true} path="/articles" component={Articles} />
                            <PrivateRoute exact={true} path="/articles/Add" component={ArticleAdd} />
                            <PrivateRoute exact={false} path="/comments" component={Coments} />
                            <PrivateRoute exact={false} path="/category" component={Categories} />
                            <PrivateRoute exact={false} path="/profiles" component={Profiles} />
                        </div>
                        <div>
                            <Footer />
                        </div>
                    </Grid.Column>
                </Grid>
            </Router>
        );
    }
}

class Login extends React.Component<{ location: any }, {}> {

    public config = new Config();

    state = {
        redirectToReferrer: false,
        error: false,
        open: true,
        password: "",
        username: ""
    };

    login = () => {
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

    render() {
        const { from } = this.props.location.state || { from: { pathname: "/" } };
        const { redirectToReferrer } = this.state;

        if (redirectToReferrer) {
            return <Redirect to={from} />;
        }

        return (
            <Modal open={this.state.open}>
                <Modal.Content>
                    <div className='login-form'>
                        <Grid
                            textAlign='center'
                            verticalAlign='middle'
                        >
                            <Grid.Column style={{ maxWidth: 450 }}>
                                <Header as='h2' color='teal' textAlign='center'>
                                    {' '}Logowanie do Backendu
                                </Header>
                                <Form size='large'>
                                    <Segment stacked>
                                        <Form.Input
                                            fluid
                                            icon='user'
                                            iconPosition='left'
                                            placeholder='Username'
                                            onChange={(value) => {
                                                this.setState({
                                                    username: value.currentTarget.value
                                                });
                                            }}
                                        />
                                        <Form.Input
                                            fluid
                                            icon='lock'
                                            iconPosition='left'
                                            placeholder='Password'
                                            type='password'
                                            onChange={(value) => {
                                                this.setState({
                                                    password: value.currentTarget.value
                                                });
                                            }}
                                        />

                                        <Button onClick={this.login} color='teal' fluid size='large'>Zaloguj</Button>
                                    </Segment>
                                </Form>
                                {
                                    this.state.error ? <Message attached='bottom' warning >
                                        Błąd podczas logowanie, spróboj ponownie
                                    </Message> : ""
                                }
                                
                            </Grid.Column>
                        </Grid>
                    </div>
                </Modal.Content>
            </Modal>
        );
    }
}

class PrivateRoute extends React.Component<{ component: any, path: string, exact: boolean }, {}> {
    render() {
        return (
            <Route
                exact={this.props.exact}
                path={this.props.path}
                render={props =>
                    Auth.isAuthenticated ? (
                        <this.props.component {...props} />
                    ) : (
                            <Redirect
                                to={{
                                    pathname: "/login",
                                    state: { from: props.location }
                                }}
                            />
                        )
                }
            />
        );
    }
}

const Footer = () => (
    <div style={{ marginTop: '5em', textAlign: 'center' }}>
        © Created at Damian Stępniak 2018
   </div>    
);
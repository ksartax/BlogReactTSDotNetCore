import * as React from "react";
import { NavLink, Router, Route, Switch } from 'react-router-dom'
import { Menu, Grid } from 'semantic-ui-react'

import Home from "./views/Home";
import Articles from "./views/Articles";
import Categories from "./views/Categories";
import Coments from "./views/Coments";
import Profiles from "./views/Profiles";
import ArticleAdd from "./views/ArticleAdd";
import createBrowserHistory from 'history/createBrowserHistory';

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
                            </Menu>
                        </div>
                    </Grid.Column>

                    <Grid.Column computer='12' style={{
                        overflow: 'scroll',
                        height: '100vh',
                        overflowX: 'hidden'
                    }}>
                        <div>
                            <Route exact path="/" component={Home} />
                            <Route exact path='/articles' component={Articles} />
                            <Route exact path='/articles/Add' component={ArticleAdd} />
                            <Route path="/comments" component={Coments} />
                            <Route path="/category" component={Categories} />
                            <Route path="/profiles" component={Profiles} />
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

const Footer = () => (
    <div style={{ marginTop: '5em', textAlign: 'center' }}>
        © Created at Damian Stępniak 2018
   </div>    
);
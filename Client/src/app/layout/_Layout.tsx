import * as React from "react";
import { NavLink,  Router ,Route, Switch} from 'react-router-dom'
import { Container, Grid, Menu, Header } from 'semantic-ui-react'
import createBrowserHistory from 'history/createBrowserHistory';

import Post from '../model/Post';
import Home from '../view/Home';
import About from '../view/About';
import PostView from '../view/PostView';
import Footer from "../view/basic/Footer";
import NotFound from "../view/basic/NotFound";

export default class Layout extends React.Component {

    state = {
        activeLink: window.location.pathname
    };

    constructor(props: any) {
        super(props);

        this.changeLinkActive.bind(this);
    }

    changeLinkActive = (name: string) => {
        this.setState({
            activeLink: name
        });
    };

    test() {
        console.log("dziala");
    }

    render() {
        const history = createBrowserHistory()

        return (
            <Router history={history}>
                    <Grid columns={2} stackable>
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
                                    <Menu.Item link >
                                        Strona główna
                                    </Menu.Item>
                                </NavLink>

                                <NavLink activeClassName='activeL' to="/o-mnie">
                                    <Menu.Item link >
                                        O mnie
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
                            <Switch>
                                <Route exact path="/" component={Home} />
                                <Route path="/o-mnie" component={About} />
                                <Route path="/view/:use" component={PostView} />
                                <Route component={NotFound} />
                            </Switch>
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

import * as React from 'react';
import { Grid, Header, Image } from 'semantic-ui-react';
import Post from '../../model/Post';
import { NavLink } from 'react-router-dom'

export default class FeaturedPost  extends React.Component<{ post: Post }, {}> {

    render() {
        return (
            <div>
                <Grid columns={1} divided relaxed stackable textAlign='center' style={{
                    backgroundImage: "url('http://tlo-na-fb.pl/images/thumbs/6cfa8e32b65015dd763c6b354a8e0f87.png')",
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center',
                    opacity: '0.7'
                }}>
                    <Grid.Column>
                        <Header as='h2' icon='star' content='Wyróżniony Post' size='tiny' style={{
                            marginTop: '0.5em'
                        }} />
                        <Header
                            as='h1'
                            content={<NavLink style={{ color: 'white' }} to={"/view/" + this.props.post.urlTitle}>{this.props.post.Title}</NavLink> }
                            inverted
                            style={{
                                fontSize: '4em',
                                fontWeight: 'normal',
                                marginBottom: '3em',
                                marginTop: '3em',
                                textShadow: '4px -1px 0px black'
                            }}
                        />
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}


import * as React from 'react';
import { Grid, Icon, Dimmer, Loader, Menu, Message} from 'semantic-ui-react'

import FeaturedPost from './components/FeaturedPost';
import { ElementPostCart } from './components/ElementPost';
import Contact from './components/Contact';
import Post from '../model/Post';
import HomeService from '../service/HomeService';

export default class Home extends HomeService {
    render() {
        return (
            <div>
                <Grid columns={1} relaxed stackable style={{ backgroundColor: 'black', marginLeft: '-1.0rem' }}>
                    <Grid.Column>
                        {
                            this.state.loaderNewPost == true ? (
                                <Dimmer active inverted>
                                    <Loader size='medium'>Ładowanie</Loader>
                                </Dimmer>
                            ) : ''
                        }
                        <FeaturedPost post={this.state.postNew} />
                    </Grid.Column>
                </Grid>

                {
                    this.state.totalArticle == 0 ? (
                        <Message warning>
                            <Message.Header>Brak Artykułów</Message.Header>
                        </Message>
                    ) : ''
                }

                <Grid columns={2} container stackable style={{ minHeight: '300px'}}>
                    <Grid.Column style={{ paddingLeft: '0rem' }}>
                        {
                            this.state.loaderPosts == true ? (
                                <Dimmer active inverted>
                                    <Loader size='medium'>Ładowanie</Loader>
                                </Dimmer>
                            ) : ''
                        }

                        {
                            this.state.postsRight.map((value) => (
                                <ElementPostCart post={value} />
                            )
                        )}
                    </Grid.Column>

                    <Grid.Column>
                        {
                            this.state.loaderPosts == true ? (
                                <Dimmer active inverted>
                                    <Loader size='medium'>Ładowanie</Loader>
                                </Dimmer>
                            ) : ''
                        }

                        {
                            this.state.postsLeft.map((value) => (
                                <ElementPostCart post={value} />
                            )
                       )}
                    </Grid.Column>
                </Grid>

                <hr/>

                <Menu floated='right' pagination>
                    <Menu.Item as='a' disabled={this.state.pageIndex == 1 || this.state.totalPage == 0} icon onClick={() => {
                        this.loadPosts(--this.state.pageIndex, this.state.urlCategory)
                    }}>
                        <Icon name='chevron left' />
                    </Menu.Item>

                    <Menu.Item as='a' icon disabled={this.state.pageIndex == this.state.totalPage || this.state.totalPage == 0} onClick={() => {
                        this.loadPosts(++this.state.pageIndex, this.state.urlCategory)
                    }}>
                        <Icon name='chevron right' />
                    </Menu.Item>
                </Menu>

            </div>
        );
    }
}
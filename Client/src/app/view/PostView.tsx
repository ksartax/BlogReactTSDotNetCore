import * as React from 'react';
import { Item, Label, Header, Breadcrumb, Loader, Dimmer, Segment } from 'semantic-ui-react'
import ContactForm from './components/ContactForm';
import CommentF from './components/CommentF';
import { NavLink } from 'react-router-dom'
import PostViewService from '../service/PostViewService';

export default class PostView extends PostViewService {

    render() {
        return (
            <div>
                <Segment>
                    {
                        this.state.loaderPost == true ? (
                            <Dimmer active inverted>
                                <Loader size='medium'>Ładowanie</Loader>
                            </Dimmer>
                        ) : ''
                    }
                    <Breadcrumb style={{ marginBottom: '2em' }}>
                        <Breadcrumb.Section link>
                            <NavLink to={ "/" }>Strona główna</NavLink>
                        </Breadcrumb.Section>
                        <Breadcrumb.Divider />
                        <Breadcrumb.Section active> {this.state.post.Title} </Breadcrumb.Section>
                    </Breadcrumb>
                    <Header as='h2' icon='star' content={this.state.post.Date} size='tiny' style={{
                        marginTop: '0.5em'
                    }} />

                    <Item.Group relaxed>
                        <Item>
                            <Item.Image src={this.state.post.ImgPath} />

                            <Item.Content>
                                <Item.Header as='a1'>{this.state.post.Title}</Item.Header>
                                <Item.Description dangerouslySetInnerHTML={{ __html: this.state.post.Description }}>
                                </Item.Description>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
                <Segment>
                    <CommentF postId={this.state.post.Id} />
                </Segment>
            </div>
        );
    }
}
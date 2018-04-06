import * as React from 'react';
import { NavLink } from 'react-router-dom'
import { Grid, Header, Image, Card, Item } from 'semantic-ui-react';
import Post from '../../model/Post';

export class ElementPostCart extends React.Component<{ post: Post }, {}> {
    render() {
        return (
            <div>
                <Grid columns={1} >
                    <Grid.Column>
                        <Card fluid>
                            <Header as='h2' icon='calendar' content={this.props.post.Date} size='tiny' />
                            <Card.Content textAlign='center'>
                                <Card.Header style={{ paddingBottom: '1em' }}>
                                    <NavLink onClick={() => console.log("ssssss")} style={{ color: 'black' }} to={"/view/" + this.props.post.urlTitle}>{this.props.post.Title}</NavLink>
                                </Card.Header>
                                <Image src={this.props.post.ImgPath} style={{
                                    maxWidth: '100%',
                                    width: 'auto',
                                    height: 'auto', 
                                }}/>
                                <Card.Description style={{ paddingTop: '1em' }} dangerouslySetInnerHTML={{ __html: this.props.post.Description.slice(0, 200) + " ..." }}>
                                </Card.Description>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

export class ElementPostItem extends React.Component<{ post: Post }, {}> {

    render() {
        return (
            <Item>
                <Item.Image size='tiny' src={this.props.post.ImgPath} />
                <Item.Content>
                    <Item.Header as='a'>
                        <NavLink style={{ color: 'black' }} to={"/view/" + this.props.post.urlTitle}>{this.props.post.Title}</NavLink>
                    </Item.Header>
                    <Item.Description dangerouslySetInnerHTML={{ __html: this.props.post.Description.slice(0, 100) + " ..." }}>
                    </Item.Description>
                    <hr />
                </Item.Content>
            </Item>
        );
    }
}
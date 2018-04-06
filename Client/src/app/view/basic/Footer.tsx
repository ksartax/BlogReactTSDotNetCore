import * as React from 'react';
import { Grid, Image, Card, Icon, Item, Button, Dimmer, Loader} from 'semantic-ui-react'
import { ElementPostItem } from '../components/ElementPost';
import Post from '../../model/Post';
import Contact from '../components/Contact';
import Config from '../../ApiConfig/Config';

export default class Footer extends React.Component<{}, {}> {

    public config = new Config();

    state = {
        posts: new Array<Post>(),
        loaderPosts: true
    };

    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        this.loadPosts();
    }

    public loadPosts() {
        let context = this;

        this.config.get("Article?page=1&limit=2&sort=asc")
            .then(function (response) {
                return response.json();
            })
            .then(function (response) {
                if (response.code != 200) {

                }

                let _posts = new Array<Post>();
                let responseData = response.responseData;
                for (let po of responseData.items) {
                    let _post = new Post(
                        po.id,
                        po.title,
                        po.description,
                        po.date,
                        po.image.path,
                        po.titleUrl
                    );

                    _posts.push(_post);
                }

                context.setState({
                    posts: _posts,
                    loaderPosts: false
                });
            })
            .catch(function (err) {
                console.log(err);
            });
    }

    render() {
        return (
            <div style={{ marginTop: '4em' }}>
                <hr />
                <Grid columns={2} textAlign='center' style={{ marginTop: '2em' }} container stackable>
                    <Grid.Column>
                        <div style={{
                            backgroundColor: 'black',
                            color: 'white'
                        }}>
                            Dawne artykuły
                        </div>
                        <Item.Group>

                            {
                                this.state.loaderPosts == true ? (
                                    <Dimmer active inverted>
                                        <Loader size='medium'>Ładowanie</Loader>
                                    </Dimmer>
                                ) : ''
                            }

                            {
                                this.state.posts.map((value) => (
                                    <ElementPostItem post={value} /> 
                                )
                            )}
                        </Item.Group>
                    </Grid.Column>

                    <Contact />

                </Grid>

                <div style={{ marginTop: '5em', textAlign: 'center' }}>
                    © Created at Damian Stępniak 2018
                    
                </div>

            </div>
        )
    }
}

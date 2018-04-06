import * as React from 'react';
import { Button, Comment, Form, Card, Dimmer, Loader, Message} from 'semantic-ui-react'
import Post, { Comment as PostComment } from '../../model/Post';
import Config from '../../ApiConfig/Config'

export default class CommentF extends React.Component<{ postId: number }, {}> {

    config = new Config();

    state = {
        firstName: "",
        email: "",
        description: "",
        loaderSend: false,
        loaderComments: true,
        Comments: Array<PostComment>(),
        sendStatus: 0
    };

    constructor(props: any) {
        super(props);
        
        this.handleSubmit.bind(this);
        this.handleInput.bind(this);
    }

    componentWillReceiveProps(nextProps: any) {
        this.loadPostComments(nextProps.postId);
    }

    public loadPostComments(postId: number) {
        let context = this;
        context.setState({
            loaderComments: true
        });

        this.config.get("Article/" + postId + "/Comments")
            .then(function (response) {
                return response.json();
            })
            .then(function (response) {
                if (response.code != 200) {

                }

                let responseData = response.responseData;
                let comments = new Array<PostComment>();
                for (let po of responseData) {
                    var com = new PostComment(
                        po.description,
                        po.surname,
                        po.date,
                        po.id
                    );

                    if (po.replayComment.length > 0) {
                        com.Comments = new PostComment(
                            po.replayComment[0].description,
                            po.replayComment[0].surname,
                            po.replayComment[0].date,
                            po.replayComment[0].id
                        )
                    }

                    comments.push(com);
                }
                context.setState({
                    Comments: comments,
                    loaderComments: false
                })
            })
            .catch(function (err) {
                console.log(err);
            });
    }

    handleSubmit() {
        let context = this;

        context.setState({
            loaderSend: true
        });

        let comment = {
            FirstName: this.state.firstName,
            Description: this.state.description
        };

        this.config.post("Article/" + this.props.postId + "/Comment/Add", comment)
            .then(function (response) {
                return response.json();
            })
            .then(function (response) {
                context.setState({
                    loaderSend: false,
                });

                if (response.code != 200) {
                    context.setState({
                        sendStatus: -1
                    });

                    return;
                }

                context.loadPostComments(context.props.postId);
                context.setState({
                    sendStatus: 1
                });
            })
            .catch(function (err) {
                console.log(err);
            });
    }

    handleInput(event: any) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        return (
            <Card.Group>
                <Card fluid content>
                    {
                        this.state.loaderSend == true || this.state.loaderComments == true ? (
                            <Dimmer active inverted>
                                <Loader size='medium'>Wysyłanie</Loader>
                            </Dimmer>
                        ) : ''
                    }

                    {
                        this.state.sendStatus == 1 ? (
                            <Message positive>
                                <Message.Header>Pomyślnie wysłano komentarz</Message.Header>
                            </Message>
                        ) : this.state.sendStatus == -1 ? (
                            <Message negative>
                                <Message.Header>Błąd podczas wysyłania wiadomosci, sproboj ponownie lub wyślij na email</Message.Header>
                            </Message>
                        ) : ''
                    }

                    <Card.Content>
                        <Card.Description>
                            <Comment.Group>
                                {this.state.Comments.map((comment) => (
                                    <Comment>
                                        <Comment.Content>
                                            <Comment.Author>{comment.Surname}  <span style={{
                                                color: 'rgba(0, 0, 0, .4)',
                                                fontSize: '.875em'
                                            }}> {comment.Date} </span> </Comment.Author>
                                            <Comment.Text>
                                                <p>{comment.Description}</p>
                                            </Comment.Text>
                                        </Comment.Content>

                                        {
                                            comment.Comments == null ? "" :
                                                <Comment.Group>
                                                    <Comment>
                                                        <Comment.Content>
                                                            <Comment.Author >{comment.Comments.Surname}  <span style={{
                                                                color: 'rgba(0, 0, 0, .4)',
                                                                fontSize: '.875em'
                                                            }}> {comment.Comments.Date} </span></Comment.Author>
                                                            <Comment.Text>
                                                                {comment.Comments.Description}
                                                            </Comment.Text>
                                                        </Comment.Content>
                                                    </Comment>
                                                </Comment.Group>
                                        }

                                    </Comment>
                                ))}
                                <Form onSubmit={this.handleSubmit.bind(this)}>
                                    <Form.Input name='firstName' label="Imie" value={this.state.firstName} required onChange={this.handleInput.bind(this)}/>
                                    <Form.TextArea name='description' value={this.state.description} label="Komentarz" required onChange={this.handleInput.bind(this)}/>
                                    <Button content='Add Comment' labelPosition='left' icon='edit' primary />
                                </Form>
                            </Comment.Group>
                        </Card.Description>
                    </Card.Content>
                </Card>
            </Card.Group>
       );
    }
}
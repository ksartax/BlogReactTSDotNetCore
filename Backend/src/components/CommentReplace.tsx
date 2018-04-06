import * as React from "react";

import { Label, Icon, Button, Modal, Header, Input, Item, Segment, Form} from 'semantic-ui-react';
import { CommentCreate } from '../model/Comment';
import Config from '../../ApiConfig/Config';
import Comments from '../views/Coments';

export default class CommentReplace extends React.Component<{ commentId: number, stateLoadComment: Comments }, {}>
{
    config = new Config();

    state = {
        commentCreate: new CommentCreate("", Config.COMMENT_FURST_NAME),
        open: false
    }

    public addComments(id: number) {
        let context = this;

        this.config.post(`/Comments/${id}/Replay`, this.state.commentCreate)
            .then(function (response) {
                return response.json();
            })
            .then(function (response) {
                if (response.code != 200) {
                    return;
                }

                context.props.stateLoadComment.loadComments(context.props.stateLoadComment.state.pageIndex);
                context.setState({
                    open: false
                })
            })
            .catch(function (err) {
                console.log(err);
            });
    }

    render() {
        return (
            <Modal open={this.state.open} trigger={<Button onClick={() => {
                this.setState({
                    open: true
                })
            }} >Odpisz</Button>}>
                <Modal.Header>Wiadomosc zwrotna</Modal.Header>
                <Modal.Content image>
                    <Modal.Description>
                        <Segment>
                            <Form onSubmit={this.addComments.bind(this, this.props.commentId)}>
                                <Form.Input name='firstName' label="Imie" value={this.state.commentCreate.FirstName} required onChange={(val) => {
                                    var comment = this.state.commentCreate;
                                    comment.FirstName = val.currentTarget.value;

                                    this.setState({
                                        commentCreate: comment
                                    })
                                }} />
                                <Form.TextArea name='description' value={this.state.commentCreate.Description} label="Komentarz" required onChange={(val) => {
                                    var comment = this.state.commentCreate;
                                    comment.Description = val.currentTarget.value;

                                    this.setState({
                                        commentCreate: comment
                                    })
                                }} />
                                <Button content='Odpisz' labelPosition='left' icon='edit' primary />
                                <Button content='Wyjdz' labelPosition='left' icon='close' negative onClick={() => {
                                    this.setState({
                                        open: false
                                    })
                                }} />
                            </Form>
                        </Segment>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        );
    }
}

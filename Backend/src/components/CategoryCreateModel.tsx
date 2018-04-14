import * as React from "react";

import { Label, Icon, Button, Segment, Modal, Header, Input, Grid, Dimmer, Loader, Message, TextArea, Form } from 'semantic-ui-react';
import Config from '../../ApiConfig/Config';
import { CategoryCreate } from '../model/Category';
import Categories from '../views/Categories';

export default class CategoryCreateModel extends React.Component<{ categories: Categories}, {}>
{
    config = new Config();

    state = {
        Title: "",
        Description: "",
        UrlTitle: "",
        loaderCategory: false,
        sendStatus: 0
    }

    constructor(props: any) {
        super(props);

        this.handleSubmit.bind(this);
    }

    handleSubmit() {
        let context = this;

        context.setState({
            loaderCategory: true
        });

        let category = new CategoryCreate(
            this.state.Title,
            this.state.Description,
            this.state.UrlTitle
        );

        this.config.post("Category/Add", category)
            .then(function (response) {
                return response.json();
            })
            .then(function (response) {
                context.setState({
                    loaderCategory: false,
                });

                if (response.code != 200) {
                    context.setState({
                        sendStatus: -1
                    });

                    return;
                }
                context.props.categories.loadCategory(1);
                context.setState({
                    sendStatus: 1
                });
            })
            .catch(function (err) {
                console.log(err);
            });
    }

    render() {
        return (
            <Modal trigger={<Button>Dodaj</Button>}>
                <Modal.Header>Dodawanie Kategorii</Modal.Header>
                <Modal.Content image>
                    <Modal.Description>
                        <Segment stacked>
                            {
                                this.state.loaderCategory == true ? (
                                    <Dimmer active inverted>
                                        <Loader size='medium'>Ładowanie</Loader>
                                    </Dimmer>
                                ) : ''
                            }

                            {
                                this.state.sendStatus == 1 ? (
                                    <Message positive>
                                        <Message.Header>Pomyślnie dodano kategorie</Message.Header>
                                    </Message>
                                ) : this.state.sendStatus == -1 ? (
                                    <Message negative>
                                        <Message.Header>Błąd podczas akcji</Message.Header>
                                    </Message>
                                ) : ''
                            }

                            <Form onSubmit={this.handleSubmit.bind(this)}>
                                <Form.Input name='firstName' label="Tytul" value={this.state.Title} required onChange={(value) => {
                                    this.setState({
                                        Title: value.currentTarget.value
                                    });
                                }} />
                                <Form.Input name='urlTitle' label="Tytul url" value={this.state.UrlTitle} required onChange={(value) => {
                                    this.setState({
                                        UrlTitle: value.currentTarget.value
                                    });
                                }} />
                                <Form.TextArea name='description' value={this.state.Description} label="Komentarz"
                                    onChange={(value) => {
                                        this.setState({
                                            Description: value.currentTarget.value
                                        });
                                }} />
                                <Button content='Dodaj' labelPosition='left' icon='edit' primary />
                            </Form>
                        </Segment>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        );
    }
}

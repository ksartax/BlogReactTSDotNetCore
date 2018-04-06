import * as React from 'react';
import { Form, Input, Button, TextArea, Card, Dimmer, Loader, Message } from 'semantic-ui-react'
import Config from '../../ApiConfig/Config'

export default class ContactForm extends React.Component<{}, {}> {

    config = new Config();

    state = {
        firstName: "",
        email: "",
        description: "",
        loaderSend: false,
        sendStatus: 0
    };

    constructor(props: any) {
        super(props);

        this.handleSubmit.bind(this);
        this.handleInput.bind(this);
    }

    handleSubmit() {
        let context = this;

        context.setState({
            loaderSend: true
        });

        let contact = {
            FirstName: this.state.firstName,
            Email: this.state.email,
            Description: this.state.description
        };

        this.config.post("Contact/Send", contact)
            .then(function (response) {
                return response.json();
            })
            .then(function (response) {
                context.setState({
                    loaderSend: false
                });

                if (response.code != 200) {
                    context.setState({
                        sendStatus: -1
                    });
                    
                    return;
                }

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
            <Card fluid raised style={{ marginTop: '4em' }}>
                {
                    this.state.loaderSend == true ? (
                        <Dimmer active inverted>
                            <Loader size='medium'>Wysyłanie</Loader>
                        </Dimmer>
                    ) : ''
                }

                {
                    this.state.sendStatus == 1 ? (
                        <Message positive>
                            <Message.Header>Pomyślnie wysłano wiadomość</Message.Header>
                        </Message>
                    ) : this.state.sendStatus == -1 ? (
                        <Message negative>
                            <Message.Header>Błąd podczas wysyłania wiadomosci, sproboj ponownie lub wyślij na email</Message.Header>
                        </Message>
                    ) : ''
                }

                <Card.Content>
                    <Card.Header>Formularz kontaktowy</Card.Header>
                    <hr />
                    <Card.Description>
                        <Form onSubmit={this.handleSubmit.bind(this)}>
                            <Form.Group widths='equal'>
                                <Form.Input placeholder='Imie' name='firstName' label='Imie' value={this.state.firstName} onChange={this.handleInput.bind(this)} required />
                                <Form.Input placeholder='Email' name='email' label='Email' value={this.state.email} onChange={this.handleInput.bind(this)} required type='email' />
                            </Form.Group>
                            <Form.TextArea placeholder='Wiadomość' name='description' label='Wiadomość' value={this.state.description} onChange={this.handleInput.bind(this)} required />
                            <Button type='submit'>Wyślij</Button>
                        </Form>
                    </Card.Description>
                </Card.Content> 
            </Card>
       );
    }
}
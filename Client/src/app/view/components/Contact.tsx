import * as React from 'react';
import { Grid, Header, Image, Card, Item } from 'semantic-ui-react';
import Post from '../../model/Post';

export default class Contact extends React.Component<{}, {}> {

    render() {
        return (
            <Grid.Column>
                <div style={{
                    backgroundColor: 'black',
                    color: 'white'
                }}>
                    Kontakt
                        </div>
                <Card fluid>
                    <Card.Content>
                        <Image floated='right' size='mini' src='https://react.semantic-ui.com/assets/images/avatar/large/steve.jpg' />
                        <Card.Header>
                            Damian Stępniak
                                    </Card.Header>
                        <Card.Meta>
                            damianos-11@o2.pl
                                    </Card.Meta>
                        <Card.Description>
                            Jeśli masz pytania skontaktuj się ze mną
                        </Card.Description>
                    </Card.Content>
                </Card>
            </Grid.Column>
        );
    }
}
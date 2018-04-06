import * as React from "react";

import { ProfilUpdate } from '../model/Profil';
import { Item, Label, Breadcrumb, Loader, Dimmer, Segment, Rating, Modal, Button } from 'semantic-ui-react';
import Draft, { draftToHtml }
    from 'react-wysiwyg-typescript';

export default class ProfilViewModel extends React.Component<{ profil: ProfilUpdate}, {}>
{
    state = {}

    constructor(props: any) {
        super(props);
    }

    render() {

        return (
            <Modal trigger={<Button>Podgląd</Button>}>
                <Modal.Header>Profil podglądowy</Modal.Header>
                <Modal.Content image>
                    <Modal.Description>
                        <Segment>
                            <Item.Group relaxed>
                                <Item>
                                    <Item.Image src={this.props.profil.ImgPath} />
                                    <Item.Content>
                                        <Item.Header>
                                            {this.props.profil.Title}
                                        </Item.Header>
                                        <Item.Meta>
                                            <span className='cinema'>
                                                {this.props.profil.Header}
                                            </span>
                                        </Item.Meta>
                                        <Item.Description dangerouslySetInnerHTML={{ __html: this.props.profil.Description }}>
                                        </Item.Description>
                                        <Item.Extra>
                                            {
                                                this.props.profil.Options.map((value) => (
                                                    <span style={{ display: 'block' }}>
                                                        <br />
                                                        <Label> {value.Title}
                                                            <Rating icon='star' disabled defaultRating={value.Value} maxRating={10} />
                                                        </Label>
                                                    </span>
                                                )
                                             )}
                                        </Item.Extra>
                                    </Item.Content>
                                </Item>
                            </Item.Group>
                        </Segment>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        );
    }
}

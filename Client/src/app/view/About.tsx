import * as React from 'react';
import { Item, Label, Breadcrumb, Loader, Dimmer, Segment, Rating } from 'semantic-ui-react'
import ContactForm from './components/ContactForm';
import { NavLink } from 'react-router-dom';
import AboutService from '../service/AboutService';

export default class About extends AboutService {
    render() {
        return (
            <div> 
                <Breadcrumb style={{ marginBottom: '2em' }}>
                    <Breadcrumb.Section link>
                        <NavLink to={"/"}>Strona główna</NavLink>
                    </Breadcrumb.Section>
                    <Breadcrumb.Divider />
                    <Breadcrumb.Section active>O mnie</Breadcrumb.Section>
                </Breadcrumb>
                <Segment>
                    <Item.Group relaxed>
                        <Item>
                            {
                                this.state.loaderProfile == true ? (
                                        <Dimmer active inverted>
                                            <Loader size='medium'>Ładowanie</Loader>
                                        </Dimmer>
                                    ) : ''
                            }
                           
                            <Item.Image src={this.state.profil.ImgPath} />
                            <Item.Content>
                                <Item.Header>
                                    {this.state.profil.Title}
                                </Item.Header>
                                <Item.Meta>
                                    <span className='cinema'>
                                        {this.state.profil.Header}
                                    </span>
                                </Item.Meta>
                                <Item.Description dangerouslySetInnerHTML={{ __html: this.state.profil.Description }}>
                                </Item.Description>
                                <Item.Extra>
                                    {
                                        this.state.profil.ProfileOptions.map((value) => (
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
                <ContactForm />
            </div>
        );
    }
}
import * as React from "react";
import { Segment, Table, Label, Menu, Icon, Button, Select, Dimmer, Loader, Item, Rating, Input, TextArea } from 'semantic-ui-react';
import Config from '../../ApiConfig/Config';
import { ProfilUpdate, ProfileOptionUpdate } from '../model/Profil';
import ProfilViewModel from '../components/ProfilViewModel';
import Draft, { htmlToDraft, draftToHtml, EmptyState, rawToDraft, draftToRaw, draftStateToHTML }
    from 'react-wysiwyg-typescript';
import { EditorState, convertToRaw } from 'draft-js';

export default class Profiles extends React.Component<{}, {}>
{
    public config = new Config();

    state = {
        profil: new ProfilUpdate(),
        saveProfiles: false,
        loadProfil: true,
        profilOption: new ProfileOptionUpdate(),
        editorState: EditorState.createEmpty(),
        editText: ""
    };

    constructor(props: any) {
        super(props);

        this.addProfil.bind(this);
    }

    componentDidMount() {
        this.loadProfiles();
    }

    public loadProfiles() {
        let context = this;

        this.config.get("Profile?page=1")
            .then(function (response) {
                return response.json();
            })
            .then(function (response) {
                context.setState({
                    loadProfil: false
                })

                if (response.code != 200) {
                    return;
                }

                let responseData = response.responseData.items[0];
                let _profil = new ProfilUpdate(
                    responseData.title,
                    responseData.description,
                    responseData.imgPath,
                    responseData.header
                );
                for (let po of responseData.options) {
                    _profil.addProfileOption(new ProfileOptionUpdate(
                        po.title,
                        po.value,
                    ));
                }

                context.setState({
                    profil: _profil,
                    editorState: htmlToDraft(_profil.Description),
                    editText: draftToHtml(_profil.Description)
                });
            })
            .catch(function (err) {
                console.log(err);
            });
    }

    public addProfil() {
        let context = this;

        context.setState({
            saveProfiles: true
        });

        this.config.post("Profile/Add", context.state.profil)
            .then(function (response) {
                return response.json();
            })
            .then(function (response) {
                context.setState({
                    saveProfiles: false
                });

                if (response.code != 200) {
                    return;
                }
            })
            .catch(function (err) {
                console.log(err);
            });
    }

    public addImg(file: File) {
        let context = this;

        var f = new FormData();
        f.append("File", file);
       
        this.config.postWithMultiple("File/Upload/profile", f)
            .then(function (response) {
                return response.json();
            })
            .then(function (response) {
                if (response.code != 200) {
                    return;
                }

                var profil = context.state.profil;
                profil.setImgPath(response.responseData.source);

                context.setState({
                    profil: profil
                });
            })
            .catch(function (err) {
                console.log(err);
            });
    }

    render() {
        const { editorState } = this.state;

        return (
            <Segment stacked>
                <Item.Group relaxed>
                    <Item>
                        {
                            this.state.saveProfiles || this.state.loadProfil == true ? (
                                <Dimmer active inverted>
                                    <Loader size='medium'>Ładowanie</Loader>
                                </Dimmer>
                            ) : ''
                        }

                        <Item.Image src={this.state.profil.ImgPath} />
                        <div></div>
                        <span>
                            <label htmlFor={'img'} style={{
                                width: "70px"
                            }} className="ui icon button">
                                <i className="upload icon"></i>
                                Zdjęcie
                            </label>

                            <input type="file" id={'img'}
                                style={{ display: "none" }}
                                onChange={(input) => {
                                    this.addImg(input.target.files[0]);
                                }}
                            />
                        </span>

                        <Item.Content>
                            <Item.Header>
                                <Input type="text" value={this.state.profil.Title} onChange={(event) => {
                                    var updated = this.state.profil;

                                    updated.Title = event.currentTarget.value;
                                    this.setState({
                                        profil: updated
                                    })
                                }} />
                            </Item.Header>
                            <Item.Meta>
                                <span className='cinema'>
                                    <Input value={this.state.profil.Header} onChange={(event) => {
                                        var updated = this.state.profil;

                                        updated.Header = event.currentTarget.value;
                                        this.setState({
                                            profil: updated
                                        })
                                    }}/>
                                </span>
                            </Item.Meta>
                            <Item.Description>
                                <Draft
                                    editorState={editorState}
                                    onEditorStateChange={(editorState) => {
                                        var updated = this.state.profil;

                                        this.setState({ editorState });
                                        updated.Description = draftToHtml(convertToRaw(editorState.getCurrentContent()));
                                        this.setState({
                                            profil: updated,
                                            editText: updated.Description
                                        })
                                    }}
                                />

                                <TextArea value={this.state.editText}
                                    onChange={(value) => {
                                        this.setState({
                                            editText: value.currentTarget.value
                                        });
                                    }}
                                /> 
                                <div></div>
                                <Button content="Edytuj" onClick={() => {
                                    this.setState({
                                        editorState: htmlToDraft(this.state.editText)
                                    })
                                }} />
                            </Item.Description>
                            <Item.Extra>
                                {
                                    this.state.profil.Options.map((value) => (
                                        <span style={{ display: 'block' }}>
                                            <br />
                                            <Label> {value.Title}
                                                <Rating icon='star' disabled defaultRating={value.Value} maxRating={10} />
                                            </Label>
                                            
                                            <Button negative onClick={() => {
                                                var updated = this.state.profil;

                                                updated.removeProfileOption(value);
                                                this.setState({
                                                    profil: updated
                                                })
                                            }}>
                                                Wykasuj
                                            </Button>
                                        </span>
                                    )
                                )}

                                <Input value={this.state.profilOption.Title} onChange={(event) => {
                                    var updated = this.state.profilOption;

                                    updated.Title = event.currentTarget.value;
                                    this.setState({
                                        profilOption: updated
                                    })
                                }} />

                                <Input value={this.state.profilOption.Value} onChange={(event) => {
                                    var updated = this.state.profilOption;

                                    updated.Value = event.currentTarget.value;
                                    this.setState({
                                        profilOption: updated
                                    })
                                }} />

                                <Button primary onClick={() => {
                                    var updated = this.state.profil;
                                    var oldProfilOption = this.state.profilOption;

                                    updated.addProfileOption(oldProfilOption);
                                    this.setState({
                                        profil: updated,
                                        profilOption: new ProfileOptionUpdate(oldProfilOption.Title, oldProfilOption.Value)
                                    })
                                }}>
                                    Dodaj
                                </Button>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                </Item.Group>   
                
                <ProfilViewModel profil={this.state.profil} />

                <Button primary onClick={this.addProfil.bind(this)}> Edutuj </Button>
            </Segment>
        )
    }
}
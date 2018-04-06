import * as React from "react";

import { Label, Icon, Button, Modal, Header, Input, Item, Segment} from 'semantic-ui-react';
import Draft, { htmlToDraft, draftToHtml, EmptyState, rawToDraft, draftToRaw, draftStateToHTML }
    from 'react-wysiwyg-typescript';
import { EditorState, convertToRaw } from 'draft-js';
import { ArticleView } from '../model/Article';

export default class ArticleViewModel extends React.Component<{ article: ArticleView}, {}>
{
    render() {
        return (
            <Modal trigger={<Button>Podgląd</Button>}>
                <Modal.Header>Podgląd Artykułu</Modal.Header>
                <Modal.Content image>
                    <Modal.Description>
                        <Segment>
                            <Item.Group relaxed>
                                <Item>
                                    <Item.Image src={this.props.article.ImgPath} />

                                    <Item.Content>
                                        <Item.Header as='a1'>{this.props.article.Title}</Item.Header>
                                        <Item.Description dangerouslySetInnerHTML={{ __html: this.props.article.Description }}>
                                        </Item.Description>
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

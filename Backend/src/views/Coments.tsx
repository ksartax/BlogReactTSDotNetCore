import * as React from "react";
import { Segment, Table, Label, Menu, Icon, Button, Select, Dimmer, Loader, Popup } from 'semantic-ui-react';
import Config from '../../ApiConfig/Config';
import { CommentView, CommentCreate } from '../model/Comment';
import { ArticleView } from '../model/Article';
import CommentReplace from '../components/CommentReplace';

export default class Comments extends React.Component<{}, {}>
{
    public config = new Config();

    state = {
        comments: Array<CommentView>(),
        loaderComments: true,
        pageIndex: 0,
        totalPage: 0
    };

    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        this.loadComments(1);
    }

    public loadComments(page: number) {
        let context = this;

        this.config.get("Comments?page=" + page + "&limit=10")
            .then(function (response) {
                return response.json();
            })
            .then(function (response) {
                context.setState({
                    loaderComments: false
                });

                if (response.code != 200) {

                }

                let _comments = new Array<CommentView>();
                let responseData = response.responseData;
                for (let po of responseData.items) {
                    let _comment = new CommentView(
                        po.description,
                        po.surname,
                        po.date,
                        po.id,
                        new ArticleView(
                            po.articleView.id,
                            po.articleView.title,
                            po.articleView.description,
                            po.articleView.date
                        )
                    );

                    if (po.replayComment.length > 0) {
                        _comment.addResponseComment(new CommentView(
                            po.replayComment[0].description,
                            po.replayComment[0].surname,
                            po.replayComment[0].date,
                            po.replayComment[0].id,
                        ));
                    }

                    _comments.push(_comment);
                }

                context.setState({
                    pageIndex: responseData.parameters.index,
                    totalPage: responseData.parameters.totalIndex,
                    comments: _comments
                });
            })
            .catch(function (err) {
                console.log(err);
            });
    }

    public dellComment(id: number) {
        let context = this;

        this.config.get(`Comments/${id}/Remove`)
            .then(function (response) {
                return response.json();
            })
            .then(function (response) {
                if (response.code != 200) {

                }

                context.loadComments(context.state.pageIndex);
            })
            .catch(function (err) {
                console.log(err);
            });
    }

    render() {
        return (
            <Segment stacked>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Id</Table.HeaderCell>
                            <Table.HeaderCell>Tytuł Posta</Table.HeaderCell>
                            <Table.HeaderCell>Imie</Table.HeaderCell>
                            <Table.HeaderCell>Opis</Table.HeaderCell>
                            <Table.HeaderCell>Akcja</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>

                        {
                            this.state.loaderComments == true ? (
                                <Dimmer active inverted>
                                    <Loader size='medium'>Ładowanie</Loader>
                                </Dimmer>
                            ) : ''
                        }

                        {
                            this.state.comments.map((comment) => (
                                <Table.Row>
                                    <Table.Cell>{comment.Id}</Table.Cell>
                                    <Table.Cell>{comment.Article.Title}</Table.Cell>
                                    <Table.Cell>{comment.Surname}</Table.Cell>
                                    <Table.Cell>{comment.Description}</Table.Cell>
                                    <Table.Cell width={2}>
                                        {
                                            comment.CommentReplace == null
                                                ?
                                                    <CommentReplace commentId={comment.Id} stateLoadComment={this} />
                                                : 
                                                <Popup
                                                    trigger={<Button content="Odpowiedz"/>}
                                                    content={comment.CommentReplace.Description}
                                                />
                                        }
                                        
                                        <Button onClick={this.dellComment.bind(this, comment.Id)} content='Wykasuj' negative />
                                    </Table.Cell>
                                </Table.Row>
                            )
                         )}

                    </Table.Body>

                    <Table.Footer>
                        <Table.Row>
                            <Table.HeaderCell colSpan='5'>
                                <Menu floated='right' pagination>
                                    <Menu.Item as='a' disabled={this.state.pageIndex == 1} icon onClick={() => {
                                        this.loadComments(--this.state.pageIndex)
                                    }}>
                                        <Icon name='chevron left' />
                                    </Menu.Item>

                                    <Menu.Item as='a' icon disabled={this.state.pageIndex == this.state.totalPage} onClick={() => {
                                        this.loadComments(++this.state.pageIndex)
                                    }}>
                                        <Icon name='chevron right' />
                                    </Menu.Item>
                                </Menu>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                </Table>
            </Segment>
        )
    }
}
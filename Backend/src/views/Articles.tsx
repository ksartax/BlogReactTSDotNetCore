import * as React from "react";
import { Segment, Table, Label, Menu, Icon, Button, Select, Dimmer, Loader} from 'semantic-ui-react';
import Config from '../../ApiConfig/Config';
import { ArticleView } from '../model/Article';
import {
    Link,
} from "react-router-dom";
import ArticleEditModel from '../components/ArticleEditModel'
import { CategoryView } from '../model/Category';

class SelectEntity {
    public key: string;
    public value: string;
    public text: string;

    constructor(Key: string, Value: string, Text: string) {
        this.key = Key;
        this.value = Value;
        this.text = Text;
    }
}

export default class Articles extends React.Component<{}, {}>
{
    public config = new Config();

    state = {
        articles: Array<ArticleView>(),
        loaderArticles: true,
        pageIndex: 0,
        totalPage: 0,
        categorys: Array<SelectEntity>()
    };

    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        this.loadArticles(1);
        this.loadCategory();
    }

    public loadCategory() {
        let context = this;

        this.config.get("Category?page=1&limit=100")
            .then(function (response) {
                return response.json();
            })
            .then(function (response) {
                if (response.code != 200) {
                    return;
                }

                let _categories = new Array<SelectEntity>();
                let responseData = response.responseData;
                for (let po of responseData.items) {
                    _categories.push(new SelectEntity(
                        po.id,
                        po.id,
                        po.title
                    ));
                }

                context.setState({
                    categorys: _categories
                });
            })
            .catch(function (err) {
                console.log(err);
            });
    }

    public loadArticles(page: number) {
        let context = this;
        context.setState({
            loaderArticles: true
        });
        this.config.get("Article?page=" + page + "&limit=10")
            .then(function (response) {
                return response.json();
            })
            .then(function (response) {
                context.setState({
                    loaderArticles: false
                });

                if (response.code != 200) {

                }

                let _articles = new Array<ArticleView>();
                let responseData = response.responseData;
                for (let po of responseData.items) {
                    let _article = new ArticleView (
                        po.id,
                        po.title,
                        po.description,
                        po.date,
                        po.image.path,
                        po.titleUrl
                    );

                    if (po.categories.length != 0) {
                        for (let category of po.categories) {
                            _article.Categories.push(new CategoryView(
                                category.id,
                                category.id,
                                category.title
                            ));
                        }
                    }
                    
                    _articles.push(_article);
                }

                context.setState({
                    pageIndex: responseData.parameters.index,
                    totalPage: responseData.parameters.totalIndex,
                    articles: _articles
                });
            })
            .catch(function (err) {
                console.log(err);
            });
    }

    render() {
        return (
            <Segment stacked>
                
                <Link to="/articles/Add">
                    <Button primary>
                        Dodaj
                    </Button>
                </Link>

                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Id</Table.HeaderCell>
                            <Table.HeaderCell>Tytuł</Table.HeaderCell>
                            <Table.HeaderCell>Akcja</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {
                            this.state.loaderArticles == true ? (
                                <Dimmer active inverted>
                                    <Loader size='medium'>Ładowanie</Loader>
                                </Dimmer>
                            ) : ''
                        }

                        {
                            this.state.articles.map((article) => (
                                <Table.Row>
                                    <Table.Cell>{article.Id}</Table.Cell>
                                    <Table.Cell>{article.Title}</Table.Cell>
                                    <Table.Cell width={2}>
                                        <ArticleEditModel articleEdit={article} categoriys={this.state.categorys}/>
                                    </Table.Cell>
                                </Table.Row>  
                            )
                        )}
                    </Table.Body>

                    <Table.Footer>
                        <Table.Row>
                            <Table.HeaderCell colSpan='3'>
                                <Menu floated='right' pagination>
                                    <Menu.Item as='a' disabled={this.state.pageIndex == 1} icon onClick={() => {
                                        this.loadArticles(--this.state.pageIndex)
                                    }}>
                                        <Icon name='chevron left' />
                                    </Menu.Item>

                                    <Menu.Item as='a' icon disabled={this.state.pageIndex == this.state.totalPage} onClick={() => {
                                        this.loadArticles(++this.state.pageIndex)
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
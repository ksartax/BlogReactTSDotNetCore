import * as React from "react";
import { Segment, Table, Label, Menu, Icon, Button, Select, Dimmer, Loader} from 'semantic-ui-react';
import Config from '../../ApiConfig/Config';
import { CategoryView } from '../model/Category';
import CategoryCreateModel from '../components/CategoryCreateModel';
import {
    Link,
} from "react-router-dom";

export default class Categories extends React.Component<{}, {}>
{
    public config = new Config();

    state = {
        categories: Array<CategoryView>(),
        loaderCategory: true,
        pageIndex: 0,
        totalPage: 0
    };

    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        this.loadCategory(1);
    }

    public loadCategory(page: number) {
        let context = this;
        context.setState({
            loaderCategory: true
        });
        this.config.get("Category?page=" + page + "&limit=10")
            .then(function (response) {
                return response.json();
            })
            .then(function (response) {
                context.setState({
                    loaderCategory: false
                });

                if (response.code != 200) {

                }

                let _categories = new Array<CategoryView>();
                let responseData = response.responseData;
                for (let po of responseData.items) {
                    let _category = new CategoryView (
                        po.id,
                        po.title,
                        po.description,
                        po.urlTitle
                    );

                    _categories.push(_category);
                }

                context.setState({
                    pageIndex: responseData.parameters.index,
                    totalPage: responseData.parameters.totalIndex,
                    categories: _categories
                });
            })
            .catch(function (err) {
                console.log(err);
            });
    }

    public dellCategory(id: number) {
        let context = this;

         this.config.get(`Category/${id}/Remove`)
            .then(function (response) {
                return response.json();
            })
            .then(function (response) {
                if (response.code != 200) {

                }

                context.loadCategory(context.state.pageIndex);
            })
            .catch(function (err) {
                console.log(err);
            });
    }

    render() {
        return (
            <Segment stacked>
                
                <CategoryCreateModel categories={this}/>

                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Id</Table.HeaderCell>
                            <Table.HeaderCell>Tytuł</Table.HeaderCell>
                            <Table.HeaderCell>Url</Table.HeaderCell>
                            <Table.HeaderCell>Akcja</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {
                            this.state.loaderCategory == true ? (
                                <Dimmer active inverted>
                                    <Loader size='medium'>Ładowanie</Loader>
                                </Dimmer>
                            ) : ''
                        }

                        {
                            this.state.categories.map((category) => (
                                <Table.Row>
                                    <Table.Cell>{category.Id}</Table.Cell>
                                    <Table.Cell>{category.Title}</Table.Cell>
                                    <Table.Cell>{category.UrlTitle}</Table.Cell>
                                    <Table.Cell width={2}>
                                        <Button onClick={this.dellCategory.bind(this, category.Id)} content='Wykasuj' negative /> 
                                    </Table.Cell>
                                </Table.Row>  
                            )
                        )}
                    </Table.Body>

                    <Table.Footer>
                        <Table.Row>
                            <Table.HeaderCell colSpan='4'>
                                <Menu floated='right' pagination>
                                    <Menu.Item as='a' disabled={this.state.pageIndex == 1} icon onClick={() => {
                                        this.loadCategory(--this.state.pageIndex)
                                    }}>
                                        <Icon name='chevron left' />
                                    </Menu.Item>

                                    <Menu.Item as='a' icon disabled={this.state.pageIndex >= this.state.totalPage} onClick={() => {
                                        this.loadCategory(++this.state.pageIndex)
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
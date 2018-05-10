"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const semantic_ui_react_1 = require("semantic-ui-react");
const Config_1 = require("../../ApiConfig/Config");
const Category_1 = require("../model/Category");
const CategoryCreateModel_1 = require("../components/CategoryCreateModel");
class Categories extends React.Component {
    constructor(props) {
        super(props);
        this.config = new Config_1.default();
        this.state = {
            categories: Array(),
            loaderCategory: true,
            pageIndex: 0,
            totalPage: 0
        };
    }
    componentDidMount() {
        this.loadCategory(1);
    }
    loadCategory(page) {
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
            let _categories = new Array();
            let responseData = response.responseData;
            for (let po of responseData.items) {
                let _category = new Category_1.CategoryView(po.id, po.title, po.description, po.urlTitle);
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
    dellCategory(id) {
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
        return (React.createElement(semantic_ui_react_1.Segment, { stacked: true },
            React.createElement(CategoryCreateModel_1.default, { categories: this }),
            React.createElement(semantic_ui_react_1.Table, { celled: true },
                React.createElement(semantic_ui_react_1.Table.Header, null,
                    React.createElement(semantic_ui_react_1.Table.Row, null,
                        React.createElement(semantic_ui_react_1.Table.HeaderCell, null, "Id"),
                        React.createElement(semantic_ui_react_1.Table.HeaderCell, null, "Tytu\u0142"),
                        React.createElement(semantic_ui_react_1.Table.HeaderCell, null, "Url"),
                        React.createElement(semantic_ui_react_1.Table.HeaderCell, null, "Akcja"))),
                React.createElement(semantic_ui_react_1.Table.Body, null,
                    this.state.loaderCategory == true ? (React.createElement(semantic_ui_react_1.Dimmer, { active: true, inverted: true },
                        React.createElement(semantic_ui_react_1.Loader, { size: 'medium' }, "\u0141adowanie"))) : '',
                    this.state.categories.map((category) => (React.createElement(semantic_ui_react_1.Table.Row, null,
                        React.createElement(semantic_ui_react_1.Table.Cell, null, category.Id),
                        React.createElement(semantic_ui_react_1.Table.Cell, null, category.Title),
                        React.createElement(semantic_ui_react_1.Table.Cell, null, category.UrlTitle),
                        React.createElement(semantic_ui_react_1.Table.Cell, { width: 2 },
                            React.createElement(semantic_ui_react_1.Button, { onClick: this.dellCategory.bind(this, category.Id), content: 'Wykasuj', negative: true })))))),
                React.createElement(semantic_ui_react_1.Table.Footer, null,
                    React.createElement(semantic_ui_react_1.Table.Row, null,
                        React.createElement(semantic_ui_react_1.Table.HeaderCell, { colSpan: '4' },
                            React.createElement(semantic_ui_react_1.Menu, { floated: 'right', pagination: true },
                                React.createElement(semantic_ui_react_1.Menu.Item, { as: 'a', disabled: this.state.pageIndex == 1, icon: true, onClick: () => {
                                        this.loadCategory(--this.state.pageIndex);
                                    } },
                                    React.createElement(semantic_ui_react_1.Icon, { name: 'chevron left' })),
                                React.createElement(semantic_ui_react_1.Menu.Item, { as: 'a', icon: true, disabled: this.state.pageIndex >= this.state.totalPage, onClick: () => {
                                        this.loadCategory(++this.state.pageIndex);
                                    } },
                                    React.createElement(semantic_ui_react_1.Icon, { name: 'chevron right' })))))))));
    }
}
exports.default = Categories;
//# sourceMappingURL=Categories.js.map
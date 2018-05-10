"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const semantic_ui_react_1 = require("semantic-ui-react");
const Config_1 = require("../../ApiConfig/Config");
const Article_1 = require("../model/Article");
const react_router_dom_1 = require("react-router-dom");
const ArticleEditModel_1 = require("../components/ArticleEditModel");
const Category_1 = require("../model/Category");
class Articles extends React.Component {
    constructor(props) {
        super(props);
        this.config = new Config_1.default();
        this.state = {
            articles: Array(),
            loaderArticles: true,
            pageIndex: 0,
            totalPage: 0
        };
    }
    componentDidMount() {
        this.loadArticles(1);
    }
    loadArticles(page) {
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
            let _articles = new Array();
            let responseData = response.responseData;
            for (let po of responseData.items) {
                let _article = new Article_1.ArticleView(po.id, po.title, po.description, po.date, po.image.path, po.titleUrl);
                if (po.categories.length != 0) {
                    for (let category of po.categories) {
                        _article.Categories.push(new Category_1.CategoryView(category.id, category.id, category.title));
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
        return (React.createElement(semantic_ui_react_1.Segment, { stacked: true },
            React.createElement(react_router_dom_1.Link, { to: "/articles/Add" },
                React.createElement(semantic_ui_react_1.Button, { primary: true }, "Dodaj")),
            React.createElement(semantic_ui_react_1.Table, { celled: true },
                React.createElement(semantic_ui_react_1.Table.Header, null,
                    React.createElement(semantic_ui_react_1.Table.Row, null,
                        React.createElement(semantic_ui_react_1.Table.HeaderCell, null, "Id"),
                        React.createElement(semantic_ui_react_1.Table.HeaderCell, null, "Tytu\u0142"),
                        React.createElement(semantic_ui_react_1.Table.HeaderCell, null, "Akcja"))),
                React.createElement(semantic_ui_react_1.Table.Body, null,
                    this.state.loaderArticles == true ? (React.createElement(semantic_ui_react_1.Dimmer, { active: true, inverted: true },
                        React.createElement(semantic_ui_react_1.Loader, { size: 'medium' }, "\u0141adowanie"))) : '',
                    this.state.articles.map((article) => (React.createElement(semantic_ui_react_1.Table.Row, null,
                        React.createElement(semantic_ui_react_1.Table.Cell, null, article.Id),
                        React.createElement(semantic_ui_react_1.Table.Cell, null, article.Title),
                        React.createElement(semantic_ui_react_1.Table.Cell, { width: 2 },
                            React.createElement(ArticleEditModel_1.default, { articleEdit: article })))))),
                React.createElement(semantic_ui_react_1.Table.Footer, null,
                    React.createElement(semantic_ui_react_1.Table.Row, null,
                        React.createElement(semantic_ui_react_1.Table.HeaderCell, { colSpan: '3' },
                            React.createElement(semantic_ui_react_1.Menu, { floated: 'right', pagination: true },
                                React.createElement(semantic_ui_react_1.Menu.Item, { as: 'a', disabled: this.state.pageIndex == 1, icon: true, onClick: () => {
                                        this.loadArticles(--this.state.pageIndex);
                                    } },
                                    React.createElement(semantic_ui_react_1.Icon, { name: 'chevron left' })),
                                React.createElement(semantic_ui_react_1.Menu.Item, { as: 'a', icon: true, disabled: this.state.pageIndex == this.state.totalPage, onClick: () => {
                                        this.loadArticles(++this.state.pageIndex);
                                    } },
                                    React.createElement(semantic_ui_react_1.Icon, { name: 'chevron right' })))))))));
    }
}
exports.default = Articles;
//# sourceMappingURL=Articles.js.map
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Config_1 = require("../ApiConfig/Config");
var Post_1 = require("../model/Post");
var HomeService = /** @class */ (function (_super) {
    __extends(HomeService, _super);
    function HomeService(props) {
        var _this = _super.call(this, props) || this;
        _this.config = new Config_1.default();
        _this.state = {
            postNew: new Post_1.default(),
            postsLeft: Array(),
            postsRight: Array(),
            loaderNewPost: true,
            loaderPosts: true,
            pageIndex: 0,
            totalPage: 0,
            urlCategory: "",
            totalArticle: -1,
            sort: "DESC"
        };
        _this.selectSort = function (event, data) {
            _this.setState({
                sort: data.value
            });
            _this.loadPosts(1, '', data.value);
        };
        return _this;
    }
    HomeService.prototype.componentDidMount = function () {
        this.loadNewPost();
        this.loadPosts(1, this.props.match.params.url);
    };
    HomeService.prototype.componentWillReceiveProps = function (nextProps) {
        this.setState({
            loaderPosts: true,
            urlCategory: nextProps.match.params.url
        });
        this.loadPosts(1, nextProps.match.params.url);
    };
    HomeService.prototype.loadNewPost = function () {
        var context = this;
        this.config.get("Article/New")
            .then(function (response) {
            return response.json();
        })
            .then(function (response) {
            context.setState({
                loaderNewPost: false,
            });
            if (response.code != 200) {
                return;
            }
            var responseData = response.responseData;
            var _post = new Post_1.default(responseData.id, responseData.title, responseData.description, responseData.date, responseData.image.path, responseData.titleUrl);
            var e = document.getElementById('new-grid');
            if (e != null) {
                e.style.backgroundRepeat = 'no-repeat';
                e.style.backgroundSize = 'cover';
                e.style.backgroundPosition = 'center center';
                e.style.opacity = '0.7';
                e.style.backgroundImage = "url('" + _post.ImgPath + "')";
            }
            context.setState({
                postNew: _post
            });
        })
            .catch(function (err) {
            console.log(err);
        });
    };
    HomeService.prototype.loadPosts = function (page, search, sort) {
        var context = this;
        var _search = search ? search : '';
        var _sort = sort ? sort : context.state.sort;
        console.log(context.state.sort);
        context.setState({
            loaderPosts: true
        });
        this.config.get("Article?page=" + page + "&limit=6" + "&sort=" + _sort + "&searchCategory=" + _search)
            .then(function (response) {
            return response.json();
        })
            .then(function (response) {
            context.setState({
                loaderPosts: false
            });
            if (response.code != 200) {
                return;
            }
            var _posts = new Array();
            var responseData = response.responseData;
            for (var _i = 0, _a = responseData.items; _i < _a.length; _i++) {
                var po = _a[_i];
                var _post = new Post_1.default(po.id, po.title, po.description, po.date, po.image.path, po.titleUrl);
                _posts.push(_post);
            }
            document.title = 'Blog Damian Stępniak';
            context.setState({
                totalArticle: _posts.length,
                postsRight: _posts.splice(0, _posts.length / 2),
                postsLeft: _posts.splice(_posts.length / 2 - 1, _posts.length),
                loaderPosts: false,
                pageIndex: responseData.parameters.index,
                totalPage: responseData.parameters.totalIndex,
            });
        })
            .catch(function (err) {
            console.log(err);
        });
    };
    return HomeService;
}(React.Component));
exports.default = HomeService;
//# sourceMappingURL=HomeService.js.map
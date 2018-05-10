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
var PostViewService = /** @class */ (function (_super) {
    __extends(PostViewService, _super);
    function PostViewService(props) {
        var _this = _super.call(this, props) || this;
        _this.config = new Config_1.default();
        _this.state = {
            post: new Post_1.default(),
            loaderPost: true
        };
        return _this;
    }
    PostViewService.prototype.componentWillReceiveProps = function (nextProps) {
        this.setState({
            loaderPost: true
        });
        this.loadPost(nextProps.match.params.use);
    };
    PostViewService.prototype.componentDidMount = function () {
        this.loadPost(this.props.match.params.use);
    };
    PostViewService.prototype.loadPost = function (param) {
        var context = this;
        var url = "Article/" + param;
        this.config.get(url)
            .then(function (response) {
            return response.json();
        })
            .then(function (response) {
            if (response.code != 200) {
            }
            var responseData = response.responseData;
            var _post = new Post_1.default(responseData.id, responseData.title, responseData.description, responseData.date, responseData.image.path, responseData.titleUrl);
            document.title = _post.urlTitle;
            context.setState({
                post: _post,
                loaderPost: false
            });
        })
            .catch(function (err) {
            console.log(err);
        });
    };
    return PostViewService;
}(React.Component));
exports.default = PostViewService;
//# sourceMappingURL=PostViewService.js.map
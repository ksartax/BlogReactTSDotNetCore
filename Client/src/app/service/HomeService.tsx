import * as React from 'react';
import Config from '../ApiConfig/Config';
import Post from '../model/Post';

export default class HomeService extends React.Component<{}, {}> {
    public config = new Config();

    state = {
        postNew: new Post(),
        postsLeft: Array<Post>(),
        postsRight: Array<Post>(),
        loaderNewPost: true,
        loaderPosts: true,
        pageIndex: 0,
        totalPage: 0
    };

    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        this.loadNewPost();
        this.loadPosts(1);
    }

    public loadNewPost() {
        let context = this;

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

                let responseData = response.responseData;
                let _post = new Post(
                    responseData.id,
                    responseData.title,
                    responseData.description,
                    responseData.date,
                    responseData.image.path,
                    responseData.titleUrl
                );

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
    }

    public loadPosts(page: number) {
        let context = this;
        context.setState({
            loaderPosts: true
        })
        this.config.get("Article?page=" + page + "&limit=6" + "&sort=DESC")
            .then(function (response) {
                return response.json();
            })
            .then(function (response) {
                context.setState({
                    loaderPosts: false
                })

                if (response.code != 200) {
                    return;
                }

                let _posts = new Array<Post>();
                let responseData = response.responseData;
                for (let po of responseData.items) {
                    let _post = new Post(
                        po.id,
                        po.title,
                        po.description,
                        po.date,
                        po.image.path,
                        po.titleUrl
                    );

                    _posts.push(_post);
                }

                document.title = 'Blog Damian Stępniak';

                context.setState({
                    postsRight: _posts.splice(0, _posts.length/2),
                    postsLeft: _posts.splice(_posts.length / 2 - 1, _posts.length),
                    loaderPosts: false,
                    pageIndex: responseData.parameters.index,
                    totalPage: responseData.parameters.totalIndex,
                });
            })
            .catch(function (err) {
                console.log(err);
            });
    }
}
import * as React from 'react';
import Config from '../ApiConfig/Config';
import Post from '../model/Post';

export default class PostViewService extends React.Component<{ match :any}, {}> {
    public config = new Config();

    state = {
        post: new Post(),
        loaderPost: true
    };

    constructor(props: any) {
        super(props);
    }

    componentWillReceiveProps(nextProps: any) {
        this.setState({
            loaderPost: true
        });

        this.loadPost(nextProps.match.params.use);
    }

    componentDidMount() {
        this.loadPost(this.props.match.params.use);
    }

    public loadPost(param: any) {
        let context = this;
        let url = "Article/" + param;

        this.config.get(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (response) {
                if (response.code != 200) {

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

                context.setState({
                    post: _post,
                    loaderPost: false
                });
            })
            .catch(function (err) {
                console.log(err);
            });
    }
}

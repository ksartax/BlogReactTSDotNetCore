import * as React from 'react';
import Config from '../ApiConfig/Config';
import Profil, { ProfileOption } from '../model/Profil';

export default class AboutService extends React.Component<{}, {}> {
    public config = new Config();

    state = {
        profil: new Profil(),
        loaderProfile: true
    };

    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        this.loadProfil();
    }

    public loadProfil() {
        let context = this;

        this.config.get("Profile")
            .then(function (response) {
                return response.json();
            })
            .then(function (response) {
                if (response.code != 200) {

                }

                let responseData = response.responseData.items[0];
                let _profil = new Profil(
                    responseData.id,
                    responseData.title,
                    responseData.description,
                    responseData.imgPath,
                    responseData.header
                );
                for (let po of responseData.options) {
                    _profil.addProfileOption(new ProfileOption(
                        po.id,
                        po.title,
                        po.description,
                        po.value,
                    ));
                }

                context.setState({
                    profil: _profil,
                    loaderProfile: false
                });
            })
            .catch(function (err) {
                console.log(err);
            });
    }
}
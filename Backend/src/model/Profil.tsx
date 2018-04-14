import Config from '../../ApiConfig/Config';

export class ProfilView {

    public Title: string;
    public Description: string;
    public Header: string;
    public ImgPath: string;
    public ProfileOptions: Array<ProfileOption>;
    public ImgPathView: string;

    constructor(title?: string, description?: string, imgPath?: string, header?: string) {
        this.Title = title ? title : '';
        this.Description = description ? description : '';
        this.ImgPath = imgPath ? imgPath : '';
        this.Header = header ? header : '';
        this.ImgPathView = imgPath ? Config.API_FILE + imgPath : '';

        this.ProfileOptions = new Array<ProfileOption>();
    }

    public addProfileOption(profileOption: ProfileOption) {
        this.ProfileOptions.push(profileOption);
    }
}

export class ProfileOption {

    public Id: number;
    public Title: string;
    public Description: string;
    public Value: string;

    constructor(id?: number, title?: string, description?: string, value?: string) {
        this.Id = id;
        this.Title = title;
        this.Description = description;
        this.Value = value;
    }
}

export class ProfilUpdate {

    public Title: string;
    public Description: string;
    public Header: string;
    public ImgPath: string;
    public Options: Array<ProfileOptionUpdate>;
    public ImgPathView: string;

    constructor(title?: string, description?: string, imgPath?: string, header?: string) {
        this.Title = title ? title : '';
        this.Description = description ? description : '';
        this.ImgPath = imgPath ? imgPath : '';
        this.Header = header ? header : '';
        this.ImgPathView = imgPath ? Config.API_FILE + imgPath : '';

        this.Options = new Array<ProfileOptionUpdate>();
    }

    public setImgPath(val: string) {
        this.ImgPathView = Config.API_FILE + val + "?" + Math.random();
        this.ImgPath = val;
    }

    public addProfileOption(profileOption: ProfileOptionUpdate) {
        this.Options.push(profileOption);
    }

    public removeProfileOption(profileOption: ProfileOptionUpdate) {
        var pom = new Array<ProfileOptionUpdate>();
        this.Options.forEach(p => {
            p.Title == profileOption.Title
                && p.Value == profileOption.Value
                ? null
                : pom.push(p)
        });

        this.Options = pom;
    }
}

export class ProfileOptionUpdate {

    public Title: string;
    public Value: string;

    constructor(title?: string, value?: string) {
        this.Title = title;
        this.Value = value;
    }
}
import Config from '../ApiConfig/Config';

export default class Profil {

    public Id: number;
    public Title: string;
    public Description: string;
    public Header: string;
    public ImgPath: string;
    public ProfileOptions: Array<ProfileOption>;

    constructor(id?: number, title?: string, description?: string, imgPath?: string, header?: string) {
        this.Id = id ? id : 0;
        this.Title = title ? title : '';
        this.Description = description ? description : '';
        this.ImgPath = imgPath ? Config.API_FILE + imgPath : '';
        this.Header = header ? header : '';

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

    constructor(id: number, title: string, description: string, value: string,) {
        this.Id = id;
        this.Title = title;
        this.Description = description;
        this.Value = value;
    }
}
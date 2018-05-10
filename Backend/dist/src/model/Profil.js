"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = require("../../ApiConfig/Config");
class ProfilView {
    constructor(title, description, imgPath, header) {
        this.Title = title ? title : '';
        this.Description = description ? description : '';
        this.ImgPath = imgPath ? imgPath : '';
        this.Header = header ? header : '';
        this.ImgPathView = imgPath ? Config_1.default.API_FILE + imgPath : '';
        this.ProfileOptions = new Array();
    }
    addProfileOption(profileOption) {
        this.ProfileOptions.push(profileOption);
    }
}
exports.ProfilView = ProfilView;
class ProfileOption {
    constructor(id, title, description, value) {
        this.Id = id;
        this.Title = title;
        this.Description = description;
        this.Value = value;
    }
}
exports.ProfileOption = ProfileOption;
class ProfilUpdate {
    constructor(title, description, imgPath, header) {
        this.Title = title ? title : '';
        this.Description = description ? description : '';
        this.ImgPath = imgPath ? imgPath : '';
        this.Header = header ? header : '';
        this.ImgPathView = imgPath ? Config_1.default.API_FILE + imgPath : '';
        this.Options = new Array();
    }
    setImgPath(val) {
        this.ImgPathView = Config_1.default.API_FILE + val + "?" + Math.random();
        this.ImgPath = val;
    }
    addProfileOption(profileOption) {
        this.Options.push(profileOption);
    }
    removeProfileOption(profileOption) {
        var pom = new Array();
        this.Options.forEach(p => {
            p.Title == profileOption.Title
                && p.Value == profileOption.Value
                ? null
                : pom.push(p);
        });
        this.Options = pom;
    }
}
exports.ProfilUpdate = ProfilUpdate;
class ProfileOptionUpdate {
    constructor(title, value) {
        this.Title = title;
        this.Value = value;
    }
}
exports.ProfileOptionUpdate = ProfileOptionUpdate;
//# sourceMappingURL=Profil.js.map
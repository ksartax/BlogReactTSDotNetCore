"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Config_1 = require("../ApiConfig/Config");
var Profil = /** @class */ (function () {
    function Profil(id, title, description, imgPath, header) {
        this.Id = id ? id : 0;
        this.Title = title ? title : '';
        this.Description = description ? description : '';
        this.ImgPath = imgPath ? Config_1.default.API_FILE + imgPath : '';
        this.Header = header ? header : '';
        this.ProfileOptions = new Array();
    }
    Profil.prototype.addProfileOption = function (profileOption) {
        this.ProfileOptions.push(profileOption);
    };
    return Profil;
}());
exports.default = Profil;
var ProfileOption = /** @class */ (function () {
    function ProfileOption(id, title, description, value) {
        this.Id = id;
        this.Title = title;
        this.Description = description;
        this.Value = value;
    }
    return ProfileOption;
}());
exports.ProfileOption = ProfileOption;
//# sourceMappingURL=Profil.js.map
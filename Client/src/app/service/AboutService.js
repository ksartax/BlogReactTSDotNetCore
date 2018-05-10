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
var Profil_1 = require("../model/Profil");
var AboutService = /** @class */ (function (_super) {
    __extends(AboutService, _super);
    function AboutService(props) {
        var _this = _super.call(this, props) || this;
        _this.config = new Config_1.default();
        _this.state = {
            profil: new Profil_1.default(),
            loaderProfile: true
        };
        return _this;
    }
    AboutService.prototype.componentDidMount = function () {
        this.loadProfil();
    };
    AboutService.prototype.loadProfil = function () {
        var context = this;
        this.config.get("Profile")
            .then(function (response) {
            return response.json();
        })
            .then(function (response) {
            if (response.code != 200) {
            }
            var responseData = response.responseData.items[0];
            var _profil = new Profil_1.default(responseData.id, responseData.title, responseData.description, responseData.imgPath, responseData.header);
            for (var _i = 0, _a = responseData.options; _i < _a.length; _i++) {
                var po = _a[_i];
                _profil.addProfileOption(new Profil_1.ProfileOption(po.id, po.title, po.description, po.value));
            }
            document.title = 'O Mnie Damian Stępniak';
            context.setState({
                profil: _profil,
                loaderProfile: false
            });
        })
            .catch(function (err) {
            console.log(err);
        });
    };
    return AboutService;
}(React.Component));
exports.default = AboutService;
//# sourceMappingURL=AboutService.js.map
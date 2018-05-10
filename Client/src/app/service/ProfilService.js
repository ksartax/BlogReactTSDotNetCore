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
var Config_1 = require("../ApiConfig/Config");
var ProfilService = /** @class */ (function (_super) {
    __extends(ProfilService, _super);
    function ProfilService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ProfilService.prototype.getProfil = function (url) {
        return _super.prototype.get.call(this, url);
    };
    ProfilService.API = "Profile";
    return ProfilService;
}(Config_1.default));
exports.default = ProfilService;
//# sourceMappingURL=ProfilService.js.map
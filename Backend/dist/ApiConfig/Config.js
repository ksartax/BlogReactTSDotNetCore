"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_storage_1 = require("cookie-storage");
class Config {
    constructor() {
        this.cookieStorage = new cookie_storage_1.CookieStorage();
    }
    post(url, data) {
        let context = this;
        return fetch(Config.API + url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + context.cookieStorage.getItem("token"),
            },
            body: JSON.stringify(data),
        });
    }
    postWithMultiple(url, data) {
        let context = this;
        return fetch(Config.API + url, {
            method: 'POST',
            headers: { 'Authorization': 'Bearer ' + context.cookieStorage.getItem("token") },
            body: data
        });
    }
    get(url) {
        let context = this;
        return fetch(Config.API + url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + context.cookieStorage.getItem("token"),
            }
        });
    }
    postAuth(url, data) {
        return fetch(Config.API_BASIC + url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
    }
}
Config.API = "http://localhost:51239/api/Administrator/";
Config.API_BASIC = "http://localhost:60733/api/";
Config.API_FILE = "http://localhost:60733/";
Config.COMMENT_FURST_NAME = "Damian Stępanik";
exports.default = Config;
//# sourceMappingURL=Config.js.map
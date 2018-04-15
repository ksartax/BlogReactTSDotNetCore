import { CookieStorage } from 'cookie-storage';

export default class Config {

    public cookieStorage = new CookieStorage();

    public static API = "http://localhost:51239/api/Administrator/";
    public static API_BASIC = "http://localhost:51239/api/";
    public static API_FILE = "http://localhost:51239/";
    public static COMMENT_FURST_NAME = "Damian Stępanik";

    public post(url: string, data: object): Promise<Response> {
        let context = this;

       return fetch(Config.API + url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + context.cookieStorage.getItem("token"),
            },
            body: JSON.stringify(data),
        })
    }

    public postWithMultiple(url: string, data: FormData): Promise<Response> {
        let context = this;

        return fetch(Config.API + url, {
            method: 'POST',
            headers: { 'Authorization': 'Bearer ' + context.cookieStorage.getItem("token") },
            body: data
        })
    }   

    public get(url: string): Promise<Response> {
        let context = this;

        return fetch(Config.API + url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + context.cookieStorage.getItem("token"),
            }
        });
    }

    public postAuth(url: string, data: object): Promise<Response> {
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

export default class Config {
    public static API = "http://localhost:51239/api/Administrator/";
    public static API_FILE = "http://localhost:51239/";
    public static COMMENT_FURST_NAME = "Damian Stępanik";

    public post(url: string, data: object): Promise<Response> {
       return fetch(Config.API + url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
    }

    public postWithMultiple(url: string, data: FormData): Promise<Response> {
        return fetch(Config.API + url, {
            method: 'POST',
            headers: {},
            body: data
        })
    }   

    public get(url: string): Promise<Response> {
        return fetch(Config.API + url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        });
    }
}

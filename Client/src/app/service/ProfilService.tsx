import Config from '../ApiConfig/Config';

export default class ProfilService extends Config {

    static API = "Profile";

    public getProfil(url: string): Promise<Response> {
        return super.get(url);
            
    }
}

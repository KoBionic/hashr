import { remote } from 'electron';

class InfoService {

    private static _instance: InfoService;

    private constructor() {
    }

    static get Instance(): InfoService {
        return InfoService._instance || (InfoService._instance = new InfoService());
    }

    /**
     * Returns the application version.
     *
     * @returns the application version
     */
    getAppVersion(): string {
        return remote.app.getVersion();
    }

}

export default InfoService;

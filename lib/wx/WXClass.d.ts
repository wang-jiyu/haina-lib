export default class WXClass {
    h5api: {
        production: string;
        test: string;
        test2: string;
        dev1: string;
        dev2: string;
        bug: string;
        sh: string;
        development: string;
    };
    getEnv(): string;
    getH5api(): any;
    init(url: any): Promise<void>;
    constructor();
    wxshare(config: {
        title: string;
        desc?: string;
        link: string;
        imgUrl: string;
        type?: string;
        dataUrl?: string;
        success?: Function;
        cancel?: Function;
    }): void;
}

import HttpRequestConfig from './HttpRequestConfig';
export default class HttpClient {
    constructor();
    interceptors: {
        request(success: Function, error: Function): void;
        response(success: Function, error: Function): void;
    };
    get(domainName: string, url: string, config?: HttpRequestConfig): Promise<any>;
    post(domainName: string, url: string, data?: any, config?: HttpRequestConfig): Promise<any>;
    put(domainName: string, url: string, data?: any, config?: HttpRequestConfig): Promise<any>;
    delete(domainName: string, url: string, config?: HttpRequestConfig): Promise<any>;
}

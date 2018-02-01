import HttpRequestConfig from './HttpRequestConfig';
export default class HttpClient {
    constructor();
    get(domainName: string, url: string, config?: HttpRequestConfig): Promise<any>;
    post(domainName: string, url: string, data?: any, config?: HttpRequestConfig): Promise<any>;
    put(domainName: string, url: string, data?: any, config?: HttpRequestConfig): Promise<any>;
    delete(domainName: string, url: string, config?: HttpRequestConfig): Promise<any>;
}

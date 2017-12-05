import HttpRequestConfig from './HttpRequestConfig';
export default class HttpClient {
    static get(domainName: string, url: string, config?: HttpRequestConfig): Promise<any>;
    static post(domainName: string, url: string, data?: any, config?: HttpRequestConfig): Promise<any>;
    static put(domainName: string, url: string, data?: any, config?: HttpRequestConfig): Promise<any>;
    static delete(domainName: string, url: string, config?: HttpRequestConfig): Promise<any>;
}

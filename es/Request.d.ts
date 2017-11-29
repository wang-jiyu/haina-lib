import { AxiosRequestConfig } from 'axios';
export declare class Request {
    private axiosInstance;
    private domainName;
    constructor(domainName: string);
    get(url: string, config?: AxiosRequestConfig): Promise<any>;
    post(url: string, data?: any, config?: AxiosRequestConfig): Promise<any>;
    put(url: string, data?: any, config?: AxiosRequestConfig): Promise<any>;
    delete(url: string, config?: AxiosRequestConfig): Promise<any>;
}
declare const _default: {
    advisor: Request;
    mapi: Request;
    bigfund: Request;
};
export default _default;

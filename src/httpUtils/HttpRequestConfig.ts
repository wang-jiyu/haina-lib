
export interface HttpTransformer {
    (data: any, headers?: any): any;
}
export interface HttpAdapter {
    (config: HttpRequestConfig): Promise<any>;
}
export interface HttpBasicCredentials {
    username: string;
    password: string;
}
export interface HttpProxyConfig {
    host: string;
    port: number;
}
export interface Cancel {
    message: string;
}
export interface CancelToken {
    promise: Promise<Cancel>;
    reason?: Cancel;
    throwIfRequested(): void;
}
export default interface HttpRequestConfig {
    url?: string;
    method?: string;
    baseURL?: string;
    transformRequest?: HttpTransformer | HttpTransformer[];
    transformResponse?: HttpTransformer | HttpTransformer[];
    headers?: any;
    params?: any;
    paramsSerializer?: (params: any) => string;
    data?: any;
    timeout?: number;
    withCredentials?: boolean;
    adapter?: HttpAdapter;
    auth?: HttpBasicCredentials;
    responseType?: string;
    xsrfCookieName?: string;
    xsrfHeaderName?: string;
    onUploadProgress?: (progressEvent: any) => void;
    onDownloadProgress?: (progressEvent: any) => void;
    maxContentLength?: number;
    validateStatus?: (status: number) => boolean;
    maxRedirects?: number;
    httpAgent?: any;
    httpsAgent?: any;
    proxy?: HttpProxyConfig;
    cancelToken?: CancelToken;
}
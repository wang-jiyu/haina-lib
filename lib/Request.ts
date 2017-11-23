import axios, { AxiosRequestConfig, AxiosInstance } from 'axios'

import {BaseUrl} from './const'


class Request {

    private axiosInstance: AxiosInstance

    private domainName: string

    constructor(domainName: string) {
        this.domainName = domainName
        this.axiosInstance = axios.create({
            baseURL: BaseUrl[domainName][process&&process.env.NODE_ENV]
        })
    }
    get(url: string, config?: AxiosRequestConfig): Promise<any> {
        return this.axiosInstance.get(url, config).then(res => {
            console.log(res)
            if (res.data.code === 200) {
                return res.data.data;
            }
        })
    }

    post(url: string, data?: any, config?: AxiosRequestConfig) {
        return this.axiosInstance.post(url, data, config).then(res => {
            if (res.data.code === 200) {
                return res.data.data;
            }
        })
    }

    put(url: string, data?: any, config?: AxiosRequestConfig) {
        return this.axiosInstance.put(url, data, config).then(res => {
            if (res.data.code === 200) {
                return res.data.data;
            }
        })
    }

    delete(url: string, config?: AxiosRequestConfig) {
        return this.axiosInstance.delete(url, config).then(res => {
            if (res.data.code === 200) {
                return res.data.data;
            }
        })
    }


}

export default {
    advisor:new Request('advisor'),
    mapi:new Request('mapi')
}
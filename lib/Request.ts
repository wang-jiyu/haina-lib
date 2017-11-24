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
        return new Promise((resolve, reject)=>{
            this.axiosInstance.get(url, config).then(res => {
                
                if (res.data.code === 200) {
                    resolve(res.data.data)
                }else {
                    reject(res.data)
                }
            }).catch(err=>{
                reject(err)
            })
        })
    }

    post(url: string, data?: any, config?: AxiosRequestConfig): Promise<any> {
        return new Promise((resolve, reject)=>{
            this.axiosInstance.post(url, data, config).then(res => {
                if (res.data.code === 200) {
                    resolve(res.data.data)
                }else {
                    reject(res.data)
                }
            }).catch(err=>{
                reject(err)
            })
        })
    }

    put(url: string, data?: any, config?: AxiosRequestConfig): Promise<any> {
        return new Promise((resolve, reject)=>{
            this.axiosInstance.put(url, data, config).then(res => {
                if (res.data.code === 200) {
                    resolve(res.data.data)
                }else {
                    reject(res.data)
                }
            }).catch(err=>{
                reject(err)
            })
        })
    }

    delete(url: string, config?: AxiosRequestConfig): Promise<any> {
        return new Promise((resolve, reject)=>{
            this.axiosInstance.delete(url, config).then(res => {
                if (res.data.code === 200) {
                    resolve(res.data.data)
                }else {
                    reject(res.data)
                }
            }).catch(err=>{
                reject(err)
            })
        })
    }


}

export default {
    advisor:new Request('advisor'),
    mapi:new Request('mapi')
}
import axios from 'axios'
import HttpRequestConfig from  './HttpRequestConfig'
export default class HttpClient {
    
    
        static get(domainName:string,url: string, config?: HttpRequestConfig): Promise<any> {
            return new Promise((resolve, reject)=>{
                axios.get(`${domainName}${url}`, config).then(res => {
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
    
        static post(domainName:string,url: string, data?: any, config?: HttpRequestConfig): Promise<any> {
            return new Promise((resolve, reject)=>{
                axios.post(`${domainName}${url}`, data, config).then(res => {
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
    
        static put(domainName:string,url: string, data?: any, config?: HttpRequestConfig): Promise<any> {
            return new Promise((resolve, reject)=>{
                axios.put(`${domainName}${url}`, data, config).then(res => {
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
    
        static delete(domainName:string,url: string, config?: HttpRequestConfig): Promise<any> {
            return new Promise((resolve, reject)=>{
                axios.delete(`${domainName}${url}`, config).then(res => {
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
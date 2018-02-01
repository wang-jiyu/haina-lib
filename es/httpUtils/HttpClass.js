import axios from 'axios';
import NativeJs from '../native/NativeJs';
export default class HttpClient {
    constructor() {
        axios.interceptors.response.use(function (response) {
            if (response.data.code === 200) {
                return response;
            }
            else if (response.data.code === 40010) {
                //java后台
                NativeJs.refreshtoken_load();
                return Promise.reject(response);
            }
            else if (response.data.code === 401) {
                //go后台
                NativeJs.refreshtoken_load();
                return Promise.reject(response);
            }
            else {
                return Promise.reject(response);
            }
        }, function (error) {
            return Promise.reject(error);
        });
    }
    get(domainName, url, config) {
        return new Promise((resolve, reject) => {
            axios.get(`${domainName}${url}`, config).then(res => {
                if (res.data.code === 200) {
                    resolve(res.data.data);
                }
                else {
                    reject(res.data);
                }
            }).catch(err => {
                reject(err);
            });
        });
    }
    post(domainName, url, data, config) {
        return new Promise((resolve, reject) => {
            axios.post(`${domainName}${url}`, data, config).then(res => {
                if (res.data.code === 200) {
                    resolve(res.data.data);
                }
                else {
                    reject(res.data);
                }
            }).catch(err => {
                reject(err);
            });
        });
    }
    put(domainName, url, data, config) {
        return new Promise((resolve, reject) => {
            axios.put(`${domainName}${url}`, data, config).then(res => {
                if (res.data.code === 200) {
                    resolve(res.data.data);
                }
                else {
                    reject(res.data);
                }
            }).catch(err => {
                reject(err);
            });
        });
    }
    delete(domainName, url, config) {
        return new Promise((resolve, reject) => {
            axios.delete(`${domainName}${url}`, config).then(res => {
                if (res.data.code === 200) {
                    resolve(res.data.data);
                }
                else {
                    reject(res.data);
                }
            }).catch(err => {
                reject(err);
            });
        });
    }
}

import axios from 'axios';
export default class HttpClient {
    constructor() {
        this.interceptors = {
            request(success, error) {
                axios.interceptors.request.use(function (config) {
                    return success(config);
                }, function (error) {
                    return error(error);
                });
            },
            response(success, error) {
                axios.interceptors.response.use(function (config) {
                    return success(config);
                }, function (error) {
                    return error(error);
                });
            }
        };
        // axios.interceptors.request.use(function (config) {
        //     // Do something before request is sent
        //     // if (window['HNtrack'].getHeadEvent) {
        //     //     config = Object.assign(config, {
        //     //         headers: {
        //     //             "uuid": window['HNtrack'].getHeadEvent
        //     //         }
        //     //     })
        //     //     console.log("requestconfig", config)
        //     //     return config
        //     // } else {
        //     //     // NativeJs.getRequestHead((result) => {
        //     //     //     config = Object.assign(config, {
        //     //     //         headers: {
        //     //     //             "uuid": result.headEvents
        //     //     //         }
        //     //     //     })
        //     //     //     console.log("requestconfig", config)
        //     //     //     return config
        //     //     // })
        //     //     return config
        //     // }
        //     return config
        // }, function (error) {
        //     // Do something with request error
        //     return Promise.reject(error);
        // });
        // axios.interceptors.response.use(function (response) {
        //     if (response.data.code === 200) {
        //         return response;
        //     } else if (response.data.code === 40010 
        //         || response.data.code === 401 
        //         || response.data.code === 40019
        //         || response.data.code === 42362
        //         || response.data.code === 42318) {
        //         //java后台
        //         NativeJs.refreshtoken_load()
        //         return Promise.reject(response.data)
        //     } else {
        //         return Promise.reject(response.data)
        //     }
        // }, function (error) {
        //     return Promise.reject(error)
        // });
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

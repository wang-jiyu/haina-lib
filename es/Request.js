define(["require", "exports", "axios", "./const/index"], function (require, exports, axios_1, index_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Request {
        constructor(domainName) {
            this.domainName = domainName;
            this.axiosInstance = axios_1.default.create({
                baseURL: index_1.BaseUrl[domainName][process && process.env.NODE_ENV]
            });
        }
        get(url, config) {
            return new Promise((resolve, reject) => {
                this.axiosInstance.get(url, config).then(res => {
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
        post(url, data, config) {
            return new Promise((resolve, reject) => {
                this.axiosInstance.post(url, data, config).then(res => {
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
        put(url, data, config) {
            return new Promise((resolve, reject) => {
                this.axiosInstance.put(url, data, config).then(res => {
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
        delete(url, config) {
            return new Promise((resolve, reject) => {
                this.axiosInstance.delete(url, config).then(res => {
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
    exports.Request = Request;
    exports.default = {
        advisor: new Request('advisor'),
        mapi: new Request('mapi'),
        bigfund: new Request('bigfund'),
        quant: new Request('quant')
    };
});

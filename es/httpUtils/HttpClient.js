define(["require", "exports", "axios"], function (require, exports, axios_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class HttpClient {
        static get(domainName, url, config) {
            return new Promise((resolve, reject) => {
                axios_1.default.get(url, config).then(res => {
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
        static post(domainName, url, data, config) {
            return new Promise((resolve, reject) => {
                axios_1.default.post(url, data, config).then(res => {
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
        static put(domainName, url, data, config) {
            return new Promise((resolve, reject) => {
                axios_1.default.put(url, data, config).then(res => {
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
        static delete(domainName, url, config) {
            return new Promise((resolve, reject) => {
                axios_1.default.delete(url, config).then(res => {
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
    exports.default = HttpClient;
});

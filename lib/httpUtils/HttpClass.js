"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var NativeJs_1 = require("../native/NativeJs");
var HttpClient = /** @class */ (function () {
    function HttpClient() {
        axios_1.default.interceptors.request.use(function (config) {
            // Do something before request is sent
            // if (window['HNtrack'].getHeadEvent) {
            //     config = Object.assign(config, {
            //         headers: {
            //             "uuid": window['HNtrack'].getHeadEvent
            //         }
            //     })
            //     console.log("requestconfig", config)
            //     return config
            // } else {
            //     // NativeJs.getRequestHead((result) => {
            //     //     config = Object.assign(config, {
            //     //         headers: {
            //     //             "uuid": result.headEvents
            //     //         }
            //     //     })
            //     //     console.log("requestconfig", config)
            //     //     return config
            //     // })
            //     return config
            // }
            return config;
        }, function (error) {
            // Do something with request error
            return Promise.reject(error);
        });
        axios_1.default.interceptors.response.use(function (response) {
            if (response.data.code === 200) {
                return response;
            }
            else if (response.data.code === 40010
                || response.data.code === 401
                || response.data.code === 40019
                || response.data.code === 42362
                || response.data.code === 42318) {
                //java后台
                NativeJs_1.default.refreshtoken_load();
                return Promise.reject(response.data);
            }
            else {
                return Promise.reject(response.data);
            }
        }, function (error) {
            return Promise.reject(error);
        });
    }
    HttpClient.prototype.get = function (domainName, url, config) {
        return new Promise(function (resolve, reject) {
            axios_1.default.get("" + domainName + url, config).then(function (res) {
                if (res.data.code === 200) {
                    resolve(res.data.data);
                }
                else {
                    reject(res.data);
                }
            }).catch(function (err) {
                reject(err);
            });
        });
    };
    HttpClient.prototype.post = function (domainName, url, data, config) {
        return new Promise(function (resolve, reject) {
            axios_1.default.post("" + domainName + url, data, config).then(function (res) {
                if (res.data.code === 200) {
                    resolve(res.data.data);
                }
                else {
                    reject(res.data);
                }
            }).catch(function (err) {
                reject(err);
            });
        });
    };
    HttpClient.prototype.put = function (domainName, url, data, config) {
        return new Promise(function (resolve, reject) {
            axios_1.default.put("" + domainName + url, data, config).then(function (res) {
                if (res.data.code === 200) {
                    resolve(res.data.data);
                }
                else {
                    reject(res.data);
                }
            }).catch(function (err) {
                reject(err);
            });
        });
    };
    HttpClient.prototype.delete = function (domainName, url, config) {
        return new Promise(function (resolve, reject) {
            axios_1.default.delete("" + domainName + url, config).then(function (res) {
                if (res.data.code === 200) {
                    resolve(res.data.data);
                }
                else {
                    reject(res.data);
                }
            }).catch(function (err) {
                reject(err);
            });
        });
    };
    return HttpClient;
}());
exports.default = HttpClient;

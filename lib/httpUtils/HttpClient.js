"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var HttpClient = /** @class */ (function () {
    function HttpClient() {
    }
    HttpClient.get = function (domainName, url, config) {
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
    HttpClient.post = function (domainName, url, data, config) {
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
    HttpClient.put = function (domainName, url, data, config) {
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
    HttpClient.delete = function (domainName, url, config) {
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

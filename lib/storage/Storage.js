"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Storage = (function () {
    function Storage() {
    }
    Storage.get = function (key, json) {
        try {
            var result = window.localStorage.getItem(key);
            if (json) {
                result = JSON.parse(result);
            }
            return result;
        }
        catch (err) {
            alert('不支持本地缓存');
        }
    };
    Storage.set = function (key, value, isjson) {
        try {
            return window.localStorage.setItem(key, isjson ? value : JSON.stringify(value));
        }
        catch (err) {
            alert('不支持本地缓存');
        }
    };
    Storage.remove = function (key) {
        try {
            return window.localStorage.removeItem(key);
        }
        catch (err) {
            alert('不支持本地缓存');
        }
    };
    Storage.clear = function () {
        try {
            return window.localStorage.clear();
        }
        catch (err) {
            alert('不支持本地缓存');
        }
    };
    return Storage;
}());
exports.default = Storage;

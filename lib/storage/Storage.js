define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Storage = (function () {
        function Storage() {
        }
        Storage.get = function (key, json) {
            var result = window.localStorage.getItem(key);
            if (json) {
                result = JSON.parse(result);
            }
            return result;
        };
        Storage.set = function (key, value) {
            return window.localStorage.setItem(key, JSON.stringify(value));
        };
        Storage.remove = function (key) {
            return window.localStorage.removeItem(key);
        };
        Storage.clear = function () {
            return window.localStorage.clear();
        };
        return Storage;
    }());
    exports.default = Storage;
});

define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Utils {
        static UUID() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        }
        static getQuertString(key) {
            let qs = window.location.search.substr(1), items = qs.length ? qs.split("&") : [];
            const item = items.filter(item => {
                return item.split("=")[0] === key;
            });
            return item[key];
        }
        static isApp() {
            var ua = window.navigator.userAgent.toLowerCase();
            return ua.indexOf('hayner') > 1;
        }
        static isIOS() {
            return window.navigator.appVersion.match(/iphone|iPad|iPod|iOS/gi);
        }
        static isAndroid() {
            return window.navigator.appVersion.match(/android/gi);
        }
    }
    exports.default = Utils;
});

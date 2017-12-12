define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Utils = (function () {
        function Utils() {
        }
        Utils.UUID = function () {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        };
        Utils.getQuertString = function (key) {
            var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null)
                return decodeURI(r[2]);
            return null;
        };
        Utils.isApp = function () {
            var ua = window.navigator.userAgent.toLowerCase();
            return ua.indexOf('hayner') > 1;
        };
        Utils.isIOS = function () {
            return window.navigator.appVersion.match(/iphone|iPad|iPod|iOS/gi);
        };
        Utils.isAndroid = function () {
            return window.navigator.appVersion.match(/android/gi);
        };
        Utils.isPhone = function (phone) {
            return /^1[3|4|5|8][0-9]\d{8}$/.test(phone.replace(/\s+/g, ""));
        };
        Utils.getRealByFontSize = function (value) {
            var base = value / 100;
            var fontSize = Number.parseFloat(document.documentElement.style.fontSize);
            return base * fontSize;
        };
        return Utils;
    }());
    exports.default = Utils;
});

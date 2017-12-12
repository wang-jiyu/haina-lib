define(["require", "exports", "pako"], function (require, exports, pako) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var StringUtils = (function () {
        function StringUtils() {
        }
        StringUtils.base64ZipToUtf8Array = function (res) {
            var strData = window.atob(res);
            var charData = strData.toString().split('').map(function (x) { return x.charCodeAt(0); });
            var binData = new Uint8Array(charData);
            var data = pako.inflate(binData);
            return data;
        };
        StringUtils.Utf8ArrayToStr = function (array) {
            var out, i, len, c;
            var char2, char3;
            out = "";
            len = array.length;
            i = 0;
            while (i < len) {
                c = array[i++];
                switch (c >> 4) {
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                        out += String.fromCharCode(c);
                        break;
                    case 12:
                    case 13:
                        char2 = array[i++];
                        out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
                        break;
                    case 14:
                        char2 = array[i++];
                        char3 = array[i++];
                        out += String.fromCharCode(((c & 0x0F) << 12) |
                            ((char2 & 0x3F) << 6) |
                            ((char3 & 0x3F) << 0));
                        break;
                }
            }
            return out;
        };
        StringUtils.largeUint8ArrToString = function (uint8arr) {
            return new Promise(function (resolve, reject) {
                var bb = new Blob([uint8arr]);
                var f = new FileReader();
                f.onload = function (e) {
                    var target = e.target;
                    resolve(target.result);
                };
                f.onerror = function (error) {
                    reject(error);
                };
                f.readAsText(bb);
            });
        };
        return StringUtils;
    }());
    exports.default = StringUtils;
});

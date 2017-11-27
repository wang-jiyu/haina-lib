define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        formatMoney(number = 0, places = 2, thousand = ',', decimal = '.', symbol = '') {
            var negative = number < 0 ? "-" : "";
            number = number / 100;
            places = Number.isInteger(number) ? 0 : places;
            var i = parseInt(Math.abs(number || 0).toFixed(places), 10);
            var is = i + "";
            var j = (j = is.length) > 3 ? j % 3 : 0;
            return symbol + negative + (j ? is.substr(0, j) + thousand : "") + is.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
        }
    };
});

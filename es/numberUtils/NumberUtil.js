define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class NumberUtil {
        static formatMoney(number = 0, config = {
                places: 2,
                thousand: ',',
                decimal: '.',
                symbol: '',
                unit: 1,
                autoUnit: false
            }) {
            let { places, thousand, decimal, symbol, unit, autoUnit } = config;
            let negative = number < 0 ? "-" : "";
            number = number / unit;
            if (autoUnit) {
                if (number > 99999999) {
                    number = number / 100000000;
                }
                else if (number > 9999) {
                    number = number / 10000;
                }
            }
            places = Number.isInteger(number) ? 0 : places;
            let i = parseInt(Math.abs(number || 0).toFixed(places), 10);
            let is = i + "";
            var j = (j = is.length) > 3 ? j % 3 : 0;
            var result = symbol + negative + (j ? is.substr(0, j) + thousand : "") + is.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
            return `${result}${unit}`;
        }
    }
    exports.default = NumberUtil;
});

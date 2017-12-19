"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var NumberUtil = (function () {
    function NumberUtil() {
    }
    NumberUtil.formatMoney = function (number, config) {
        if (number === void 0) { number = 0; }
        var param = Object.assign({}, {
            places: 2,
            thousand: ',',
            decimal: '.',
            symbol: '',
            unit: 1,
            autoUnit: false
        }, __assign({}, config));
        var places = param.places, thousand = param.thousand, decimal = param.decimal, symbol = param.symbol, unit = param.unit, autoUnit = param.autoUnit;
        var unitStr = '元';
        var negative = number < 0 ? "-" : "";
        number = number / unit;
        places = Number.isInteger(number) ? 0 : places;
        var i = parseInt(Math.abs(number || 0).toFixed(places), 10);
        if (autoUnit) {
            if (i > 99999999) {
                i = i / 100000000;
                unitStr = '亿';
            }
            else if (i > 9999) {
                i = i / 10000;
                unitStr = '万';
            }
        }
        var is = i + "";
        var m = is.length;
        var j = m > 3 ? m % 3 : 0;
        var result = symbol + negative + (j ? is.substr(0, j) + thousand : "") + is.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + (Math.abs(number) - i).toFixed(places).slice(2) : "");
        return autoUnit ? { result: result, unit: unitStr } : result;
    };
    return NumberUtil;
}());
exports.default = NumberUtil;

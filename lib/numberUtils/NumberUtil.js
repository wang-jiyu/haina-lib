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
var NumberUtil = /** @class */ (function () {
    function NumberUtil() {
    }
    /**
     *
     * @param number 需要格式化的数字 默认所有数字是精确到分的
     * @param places 需要保留的小数位
     * @param symbol 需要使用的金额标识，￥，$等
     * @param thousand 千位格式化的分隔符
     * @param decimal 小数位的分隔符
     * @param unit 单位，根据number和期望结果决定
     * @param autoUnit 小数位的分隔符
     */
    NumberUtil.formatMoney = function (number, config) {
        if (number === void 0) { number = 0; }
        var param = Object.assign({}, {
            places: 2,
            thousand: ',',
            decimal: '.',
            symbol: '',
            unit: 1,
            autoUnit: false,
            autoPlaces: true
        }, __assign({}, config));
        var places = param.places, thousand = param.thousand, decimal = param.decimal, symbol = param.symbol, unit = param.unit, autoUnit = param.autoUnit, autoPlaces = param.autoPlaces;
        var unitStr = '元';
        var negative = number < 0 ? "-" : "";
        number = number / unit;
        if (autoUnit) {
            if (Math.abs(number) > 99999999) {
                number = number / 100000000;
                unitStr = '亿';
            }
            else if (Math.abs(number) > 9999) {
                number = number / 10000;
                unitStr = '万';
            }
        }
        if (autoPlaces) {
            places = Number.isInteger(number) ? 0 : places;
        }
        var i = parseInt(Math.abs(number || 0).toFixed(places), 10);
        var is = i + "";
        var m = is.length;
        var j = m > 3 ? m % 3 : 0;
        var result = symbol + negative + (j ? is.substr(0, j) + thousand : "") + is.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + (Math.abs(number) - i).toFixed(places).slice(2) : "");
        return autoUnit ? { result: result, unit: unitStr } : result;
    };
    /**
     *
     * @param number 需要格式化的数字 默认所有数字是精确到分的
     * @param places 需要保留的小数位
     * @param symbol 需要使用的金额标识，￥，$等
     * @param thousand 千位格式化的分隔符
     * @param decimal 小数位的分隔符
     * @param unit 单位，根据number和期望结果决定
     * @param autoUnit 小数位的分隔符
     */
    NumberUtil.formatStockCount = function (number, config) {
        if (number === void 0) { number = 0; }
        var param = Object.assign({}, {
            unit: 1,
            autoUnit: false
        }, __assign({}, config));
        var unit = param.unit, autoUnit = param.autoUnit;
        var unitStr = '股';
        number = number / unit;
        if (autoUnit) {
            if (Math.abs(number) > 99999999) {
                number = number / 100000000;
                unitStr = '亿股';
            }
            else if (Math.abs(number) > 9999) {
                number = number / 10000;
                unitStr = '万股';
            }
        }
        var result = Math.abs(number);
        return autoUnit ? { result: result, unit: unitStr } : result;
    };
    return NumberUtil;
}());
exports.default = NumberUtil;

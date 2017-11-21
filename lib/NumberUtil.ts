

export default {
    /**
     * 
     * @param number 需要格式化的数字 默认所有数字是精确到分的
     * @param places 需要保留的小数位
     * @param symbol 需要使用的金额标识，￥，$等
     * @param thousand 千位格式化的分隔符
     * @param decimal 小数位的分隔符
     */
    formatMoney(number: number = 0, places: number = 2, thousand: string = ',', decimal: string = '.', symbol: string = '') {
        var negative = number < 0 ? "-" : ""
        number = number / 100
        places = Number.isInteger(number) ? 0 : places
        var i = parseInt(Math.abs(number || 0).toFixed(places), 10)
        var is = i + ""
        var j = (j = is.length) > 3 ? j % 3 : 0;
        return symbol + negative + (j ? is.substr(0, j) + thousand : "") + is.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
    }

}
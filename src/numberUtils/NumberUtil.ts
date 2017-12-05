

export interface IFormatMoneyConfig {
    places?: number,
    thousand?: string,
    decimal?: string,
    symbol?: string,
    unit?:number,
    autoUnit?:boolean
}
export default class NumberUtil {
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
    static formatMoney(number: number = 0, config: IFormatMoneyConfig = {
        places: 2,
        thousand: ',',
        decimal: '.',
        symbol: '',
        unit:1,
        autoUnit:false
    }) {
        let { places, thousand, decimal, symbol,unit,autoUnit } = config

        let negative = number < 0 ? "-" : ""
        number = number / unit
        if(autoUnit){
            if(number>99999999){
                number = number / 100000000
            }else if(number>9999){
                number = number / 10000
            }
        }
        places = Number.isInteger(number) ? 0 : places
        let i = parseInt(Math.abs(number || 0).toFixed(places), 10)
        let is = i + ""
        var j = (j = is.length) > 3 ? j % 3 : 0;
        var result = symbol + negative + (j ? is.substr(0, j) + thousand : "") + is.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "")
        return `${result}${unit}`
    }

}
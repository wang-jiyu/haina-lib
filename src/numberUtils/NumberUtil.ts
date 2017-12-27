

export interface IFormatMoneyConfig {
    places?: number,
    thousand?: string,
    decimal?: string,
    symbol?: string,
    unit?:number,
    autoUnit?:boolean,
    autoPlaces?:boolean
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
    static formatMoney(number: number = 0, config?: IFormatMoneyConfig):any {
        const param = Object.assign({}, {
            places: 2,
            thousand: ',',
            decimal: '.',
            symbol: '',
            unit: 1,
            autoUnit: false,
            autoPlaces:true
        }, { ...config })
        let { places, thousand, decimal, symbol, unit, autoUnit,autoPlaces } = param
        let unitStr = '元'
        let negative = number < 0 ? "-" : ""
        number = number / unit

        if(autoPlaces){
            places = Number.isInteger(number) ? 0 : places
        }
        let i = parseInt(Math.abs(number || 0).toFixed(places), 10)
        if(autoUnit){
            if(i>99999999){
                i = i / 100000000
                unitStr = '亿'
            }else if(i>9999){
                i = i / 10000
                unitStr = '万'
            }
        }
        let is = i + ""
        let m = is.length
        var j = m > 3 ? m % 3 : 0;
        var result = symbol + negative + (j ? is.substr(0, j) + thousand : "") + is.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + (Math.abs(number)-i).toFixed(places).slice(2) : "")
        return autoUnit?{result,unit:unitStr}:result;
    }

}
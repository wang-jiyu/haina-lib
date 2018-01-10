export interface IFormatMoneyConfig {
    places?: number;
    thousand?: string;
    decimal?: string;
    symbol?: string;
    unit?: number;
    autoUnit?: boolean;
    autoPlaces?: boolean;
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
    static formatMoney(number?: number, config?: IFormatMoneyConfig): any;
}

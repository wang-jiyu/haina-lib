export interface IFormatMoneyConfig {
    places: number;
    thousand: string;
    decimal: string;
    symbol: string;
    unit: number;
    autoUnit: boolean;
}
export default class NumberUtil {
    static formatMoney(number?: number, config?: IFormatMoneyConfig): string;
}

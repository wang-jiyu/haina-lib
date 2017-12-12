export default class Utils {
    static UUID(): string;
    static getQuertString(key: string): string;
    static isApp(): boolean;
    static isIOS(): RegExpMatchArray;
    static isAndroid(): RegExpMatchArray;
    static isPhone(phone: string): boolean;
    static getRealByFontSize(value: number): number;
}

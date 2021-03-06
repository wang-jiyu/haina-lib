export default class Utils {
    static phoneRegex: {
        'ar-dz': RegExp;
        'ar-sy': RegExp;
        'ar-sa': RegExp;
        'en-us': RegExp;
        'cs-cz': RegExp;
        'de-de': RegExp;
        'da-dk': RegExp;
        'el-gr': RegExp;
        'en-au': RegExp;
        'en-gb': RegExp;
        'en-hk': RegExp;
        'en-in': RegExp;
        'en-nz': RegExp;
        'en-za': RegExp;
        'en-zm': RegExp;
        'es-es': RegExp;
        'fi-fi': RegExp;
        'fr-fr': RegExp;
        'he-il': RegExp;
        'hu-hu': RegExp;
        'it-it': RegExp;
        'ja-jp': RegExp;
        'ms-my': RegExp;
        'nb-no': RegExp;
        'nl-be': RegExp;
        'nn-no': RegExp;
        'pl-pl': RegExp;
        'pt-br': RegExp;
        'pt-pt': RegExp;
        'ru-ru': RegExp;
        'sr-rs': RegExp;
        'tr-tr': RegExp;
        'vi-vn': RegExp;
        'zh-cn': RegExp;
        'zh-tw': RegExp;
    };
    static UUID(): string;
    static getQuertString(key: string): string;
    static isApp(): boolean;
    static isIOS(): RegExpMatchArray;
    static isAndroid(): RegExpMatchArray;
    static isPhone(phone: string): any;
    static getRealByFontSize(value: number): number;
    static setDocumentTitle(title: string): void;
    static loadOutJS(jsurl: string, async?: boolean): void;
    static isWx(): boolean;
    static isQQ(): boolean;
    static CheckIdCard: {
        Wi: number[];
        Xi: (string | number)[];
        Pi: number[];
        brithday18: (sIdCard: any) => boolean;
        brithday15: (sIdCard: any) => boolean;
        validate: (sIdCard: any) => boolean;
        province: (sIdCard: any) => boolean;
    };
    static IDCardVerify(idNo: any, successCallback: any, errCallback: any): any;
    static isChineseName(name: any): boolean;
    /**
     * 重定向到登陆页面
     */
    static redirectLogin(): void;
}

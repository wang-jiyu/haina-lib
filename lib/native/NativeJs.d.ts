export declare const baseNativeJs: (funcName: string, params?: object, ios?: object) => void;
import { IShareValue } from './NativeInterface';
export default class NativeJs {
    static baseWindow(funcName: string): void;
    static login(callback: Function): any;
    static refreshtoken_load(): any;
    static toPay(ref_id: any, ref_type: any, buyCycle?: object): any;
    static gorouter(router: string, iosRouter: string): any;
    static shareWeiXin(sharevalue: IShareValue): void;
    static shareFriends(sharevalue: IShareValue): void;
    static share(sharevalue: {
        "desc": string;
        "imageUrl": 'https://m2.0606.com.cn/assets/images/logo.png';
        "shareType": 'all';
        "site": '海纳智投';
        "siteUrl": string;
        "title": string;
        "titleUrl": string;
        "url": string;
    }): void;
    static ihanerFSP(product_id: string, risk_score: string): void;
    static baseGoRouter(host: string, param: string | object): void;
    static gotoStockDetailPage(stocknSid: string): void;
    static gotoLiveDetailPage(liveType: string, roomId: string, serviceId: string): void;
    static gotoLiveListPage(): void;
    static gotoBanner(bannerdata: {
        _id;
        create_time;
        image_url;
        device_image_url;
        intro;
        link_url;
        order;
        target;
        title;
        link_type;
        ref_type;
    }): void;
    static gotoHome(): void;
    static tradeStock(stock_name: string, stock_code: string, buyorsell: 'buy' | 'sell'): void;
    static imageClick(img_url: any): void;
    static changeBodyFontSize(isshow: any, callback: any): void;
}

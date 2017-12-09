export declare const baseNativeJs: (funcName: string, params?: object, ios?: object) => void;
import { IShareValue } from './NativeInterface';
export default class NativeJs {
    static login(callback: Function): any;
    static toPay(ref_id: any, ref_type: any, buyCycle?: object): any;
    static gorouter(router: string, iosRouter: string): any;
    static shareWeiXin(shareValue: IShareValue): void;
    static shareFriends(shareValue: IShareValue): void;
    static share(shareValue: IShareValue): void;
    static ihanerFSP(product_id: string, risk_score: string): void;
    static gotoStockDetailPage(stocknSid: string): void;
    static gotoLiveDetailPage(liveType: string, roomId: string, serviceId: string): void;
}

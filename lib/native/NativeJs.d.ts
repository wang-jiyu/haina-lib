export declare const baseNativeJs: (funcName: string, params?: object, ios?: object) => void;
import { IShareValue } from './NativeInterface';
export default class NativeJs {
    static baseWindow(funcName: string): void;
    static login(callback: Function): any;
    static refreshtoken_load(): any;
    static toPay(ref_id: any, ref_type: any, buyCycle?: object): any;
    static gorouter(router: string, iosRouter: string): any;
    static shareWeiXin(shareValue: IShareValue): void;
    static shareFriends(shareValue: IShareValue): void;
    static share(shareValue: IShareValue): void;
    static ihanerFSP(product_id: string, risk_score: string): void;
    static baseGoRouter(host: string, param: string | object): void;
    static gotoStockDetailPage(stocknSid: string): void;
    static gotoLiveDetailPage(liveType: string, roomId: string, serviceId: string): void;
    static gotoLiveListPage(): void;
}

export declare const baseNativeJs: (funcName: string, params?: object, ios?: object) => void;
import { IShareValue } from './NativeInterface';
export default class NativeJs {
    static login(callback: Function): any;
    static toPay(ref_id: any, ref_type: any, buyCycle?: object): any;
    static gorouter(router: string): any;
    static shareWeiXin(shareValue: IShareValue): void;
    static shareFriends(shareValue: IShareValue): void;
    static share(shareValue: IShareValue): void;
}

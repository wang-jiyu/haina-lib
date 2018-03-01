export declare const baseNativeJs: (funcName: string, params?: object, ios?: object) => void;
export default class NativeJs {
    static baseWindow(funcName: string): void;
    /**
     * 登陆
     * 返回token
     * @param callback
     */
    static login(callback: Function): any;
    /**
     * 刷新token
     */
    static refreshtoken_load(): any;
    /**
     * 跳转支付
     * @param ref_id  产品id
     * @param ref_type 产品类型
     * @param buyCycle 限制体验支付，或者自实现支付列表的时候，需要传此参数
     */
    static toPay(ref_id: any, ref_type: any, buyCycle?: object): any;
    /**
     * 应用内部跳转
     * @param router
     */
    static gorouter(router: string, iosRouter: string): any;
    static baseShare(name: any, sharevalue: {
        "desc": string;
        "imageUrl": string;
        "shareType": string;
        "site": string;
        "siteUrl": string;
        "title": string;
        "titleUrl": string;
        "url": string;
        "eventId"?: string;
        "parameter"?: Object;
    }): void;
    /**
     * 分享到微信
     * @param shareValue
     * @param desc 内容描述
     * @param imageUrl img的url
     * @param shareType 分享的类型
     * @param site 网站名字
     * @param siteUrl 网站链接
     * @param title 分享标题
     * @param titleUrl 标题的url
     * @param url 本身的链接
     */
    static shareWeiXin(sharevalue: {
        "desc": string;
        "imageUrl": string;
        "shareType": string;
        "site": string;
        "siteUrl": string;
        "title": string;
        "titleUrl": string;
        "url": string;
        "eventId"?: string;
        "parameter"?: Object;
    }): void;
    /**
     * 分享到朋友圈
     * @param shareFriends
     * @param desc 内容描述
     * @param imageUrl img的url
     * @param shareType 分享的类型
     * @param site 网站名字
     * @param siteUrl 网站链接
     * @param title 分享标题
     * @param titleUrl 标题的url
     * @param url 本身的链接
     */
    static shareFriends(sharevalue: {
        "desc": string;
        "imageUrl": string;
        "shareType": string;
        "site": string;
        "siteUrl": string;
        "title": string;
        "titleUrl": string;
        "url": string;
        "eventId"?: string;
        "parameter"?: Object;
    }): void;
    /**
     * 调用移动端的分享
     * @param shareFriends
     * @param desc 内容描述
     * @param imageUrl img的url
     * @param shareType 分享的类型
     * @param site 网站名字
     * @param siteUrl 网站链接
     * @param title 分享标题
     * @param titleUrl 标题的url
     * @param url 本身的链接
     */
    static share(sharevalue: {
        "desc": string;
        "imageUrl": string;
        "shareType": string;
        "site": string;
        "siteUrl": string;
        "title": string;
        "titleUrl": string;
        "url": string;
        "eventId"?: string;
        "parameter"?: Object;
    }): void;
    /**
     *
     * @param product_id 适当性检测
     * @param risk_score
     */
    static ihanerFSP(product_id: string, risk_score: string): void;
    /**
     *
     * @param 跳转
     */
    static baseGoRouter(host: string, param: string | object): void;
    /**
     *
     * @param stocknSid 股票id
     */
    static gotoStockDetailPage(stocknSid: string): void;
    /**
     *
     * @param router跳转战队直播室
     * ihayner://homelive:10060?param={"data":"{\"liveRoomType\":0,\"roomId\":\"71314e37e7c790c95af57bcb\",\"serviceId\":\"558a3e9025ea5de341f5203d\",\"type\":0}","defaultParam":"2"}
     */
    static gotoLiveDetailPage(liveType: string, roomId: string, serviceId: string): void;
    /**
     *
     * @param router跳转直播列表
     */
    static gotoLiveListPage(): void;
    /**
     *
     * @param 跳转banner页
     */
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
    /**
     * 跳转首页
     */
    static gotoHome(): void;
    /**
     * 跳转交易
     */
    static tradeStock(stock_name: string, stock_code: string, buyorsell: 'buy' | 'sell'): void;
    /**
     * 点击放大图片
     */
    static imageClick(img_url: any): void;
    /**
     * 字体缩放
     */
    static changeBodyFontSize(isshow: any, callback: any): void;
    /**
     * 自选股添加和删除
     * @param stock_method 添加还是删除", （boolean值 默认false 删除）
     * @param stock_code 股票代码
     */
    static optional(stock_method: boolean, stock_code: string): void;
    /**
     * 获取埋点头
     */
    static getRequestHead(callback: any): void;
    /**
     * 拨打电话
     */
    static callphone(title: string, phone: string): void;
    static goBack(): void;
    static statusBarStyle(style: any): void;
    static gotoapp(): void;
    static cangoback(goback: any): void;
}

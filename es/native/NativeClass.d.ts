export declare const baseNativeJs: (funcName: string, params?: object, ios?: object) => void;
export default class NativeClass {
    baseWindow(funcName: string): void;
    /**
     * 登陆
     * 返回token
     * @param callback
     */
    login(callback: Function): any;
    /**
     * 刷新token
     */
    refreshtoken_load(): any;
    /**
     * 跳转支付
     * @param ref_id  产品id
     * @param ref_type 产品类型
     * @param buyCycle 限制体验支付，或者自实现支付列表的时候，需要传此参数
     */
    toPay(ref_id: any, ref_type: any, buyCycle?: object): any;
    /**
     * 应用内部跳转
     * @param router
     */
    gorouter(router: string, iosRouter: string): any;
    baseShare(name: any, sharevalue: {
        "desc": string;
        "imageUrl": 'https://m2.0606.com.cn/assets/images/logo.png';
        "shareType": 'all';
        "site": '海纳智投';
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
    shareWeiXin(sharevalue: {
        "desc": string;
        "imageUrl": 'https://m2.0606.com.cn/assets/images/logo.png';
        "shareType": 'all';
        "site": '海纳智投';
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
    shareFriends(sharevalue: {
        "desc": string;
        "imageUrl": 'https://m2.0606.com.cn/assets/images/logo.png';
        "shareType": 'all';
        "site": '海纳智投';
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
    share(sharevalue: {
        "desc": string;
        "imageUrl": 'https://m2.0606.com.cn/assets/images/logo.png';
        "shareType": 'all';
        "site": '海纳智投';
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
    ihanerFSP(product_id: string, risk_score: string): void;
    /**
     *
     * @param 跳转
     */
    baseGoRouter(host: string, param: string | object): void;
    /**
     *
     * @param stocknSid 股票id
     */
    gotoStockDetailPage(stocknSid: string): void;
    /**
     *
     * @param router跳转战队直播室
     * ihayner://homelive:10060?param={"data":"{\"liveRoomType\":0,\"roomId\":\"71314e37e7c790c95af57bcb\",\"serviceId\":\"558a3e9025ea5de341f5203d\",\"type\":0}","defaultParam":"2"}
     */
    gotoLiveDetailPage(liveType: string, roomId: string, serviceId: string): void;
    /**
     *
     * @param router跳转直播列表
     */
    gotoLiveListPage(): void;
    /**
     *
     * @param 跳转banner页
     */
    gotoBanner(bannerdata: {
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
    gotoHome(): void;
    /**
     * 跳转交易
     */
    tradeStock(stock_name: string, stock_code: string, buyorsell: 'buy' | 'sell'): void;
    /**
     * 点击放大图片
     */
    imageClick(img_url: any): void;
    /**
     * 字体缩放
     */
    changeBodyFontSize(isshow: any, callback: any): void;
    /**
     * 自选股添加和删除
     * @param stock_method 添加还是删除", （boolean值 默认false 删除）
     * @param stock_code 股票代码
     */
    optional(stock_method: boolean, stock_code: string): void;
    /**
     * 获取埋点头
     */
    getRequestHead(callback: any): void;
    /**
     * 拨打电话
     */
    callphone(title: string, phone: string): void;
}

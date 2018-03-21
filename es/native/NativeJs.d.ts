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
        "imageUrl"?: string;
        "shareType"?: string;
        "site"?: string;
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
        "imageUrl"?: string;
        "shareType"?: string;
        "site"?: string;
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
        "imageUrl"?: string;
        "shareType"?: string;
        "site"?: string;
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
        "imageUrl"?: string;
        "shareType"?: string;
        "site"?: string;
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
    static gotoBanner(bannerdata: any): void;
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
    static getPayRequestHead(callback: any): void;
    /**
     * 拨打电话
     */
    static callphone(title: string, phone: string): void;
    static goBack(): void;
    static statusBarStyle(style: any): void;
    static gotoapp(): void;
    static cangoback(goback: any): void;
    /**
     * 控制改变toolbar颜色与标题
     * @param title
     * @param color
     */
    static toolbar(title: any, color: any): void;
    /**
     * 通知原生请求失败
     */
    static requestfailed(): void;
    /**
     *
     * @param user_id 开户
     * @param url
     */
    static opAccount(user_id: any, url: any): void;
    /**
     *
     * @param user_id 交易
     * @param company_id
     */
    static trade(user_id: any, company_id: any): void;
    static bindAccount(user_id: any, company_id: any): void;
    /**
     * 唤起支付sdk
     * @param order_id
     * @param prepay
     * @param paymethod 1是微信，2是支付宝，3线下支付
     */
    static getPayInfo(messageBody: {
        order_id;
        prepay;
        paymethod;
    }, callback: any): void;
    /**
     * 直接调起适当性认证
     */
    static startFsp(productId: any, riskScore: any): void;
    /**
     * 线下支付提示
     */
    static offlinePayAlertMessage(): void;
    /**
     * 海纳适当性页面 需要提示用户拨打电话时进行的弹框
     * @param phone 手机号码
     * @param content 显示内容
     * @param title 标题
     */
    static callPhoneAlert(phone: number, content: string, title: string): void;
    /**
     * 当购买业务时，如果用户不符合当前产品，弹框提示重新做或者打电话
     * @param phone
     * @param content
     * @param title
     * @param callback
     */
    static riskAlert(phone: number, content: string, title: string, callback: Function): void;
    /**
     * 回调原声通知原声实名认证已经完成
     * @param name
     */
    static authSuccess(name: string): void;
    /**
     * 回调风险测评成功
     * @param type_string 类型的名称 例如:稳健性，激进型
     * @param risk_score 风险测评的分数
     */
    static riskSuccess(type_string: string, risk_score: number): void;
    /** 通知原声app整个开通流程完毕 */
    static confirmationSuccess(): void;
    /**
     * 通知原声app适当性中途意外出错
     * @param err_code 后台返回的错误码
     * @param err_msg 接口返回的错误描述
     */
    static fspFailed(err_code: number, err_msg: string): void;
}

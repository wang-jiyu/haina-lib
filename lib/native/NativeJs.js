"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = require("../utils/Utils");
var WXClass_1 = require("../wx/WXClass");
exports.baseNativeJs = function (funcName, params, ios) {
    try {
        if (Utils_1.default.isApp()) {
            if (typeof window['webkit'] != 'undefined') {
                var realParam = ios ? Object.assign({}, {
                    "nativeCallJS": funcName
                }, __assign({}, ios)) : Object.assign({}, {
                    "nativeCallJS": funcName
                }, __assign({}, params));
                console.log("nativeparam", realParam);
                window['webkit'].messageHandlers.jsCallNative.postMessage(realParam);
            }
            else if (/Android/i.test(window.navigator.userAgent)) {
                var realParam = Object.assign({}, {
                    "nativecalljs": funcName
                }, __assign({}, params)); //android
                var paramstr = JSON.stringify(realParam);
                console.log("nativeparam", paramstr);
                window['haina'].pushEvent(paramstr);
            }
        }
        else {
            if (Utils_1.default.isIOS()) {
                /* EXACT:http://m-test.0606.com.cn/diagnose/js/floatwindow.js*/
                // window.location.href = 'ihayner://diagnosis_stock_activity:10050';
                // setTimeout(function () { window.location.href = 'itms-apps://itunes.apple.com/app/id1236797754' }, 1000);
            }
            else if (Utils_1.default.isAndroid()) {
                //此操作会调起app并阻止接下来的js执行
                // let iframe = document.createElement("iframe")
                // iframe.src = "ihayner://diagnosis_stock_activity:10050"
                // iframe.style.display = "none"
                // // let iframe = document.createElement("<iframe src='' style='display:none' target='' ></iframe>")
                // document.body.appendChild(iframe);
                // //没有安装应用会执行下面的语句
                // setTimeout(function () { window.location.href = 'D' + 'download/download.html' }, 1000);
            }
        }
    }
    catch (error) {
        console.log("nativejs error", error);
    }
};
var NativeJs = /** @class */ (function () {
    function NativeJs() {
    }
    NativeJs.baseWindow = function (funcName) {
        window[funcName] = function () {
            delete window[funcName];
        };
    };
    /**
     * 登陆
     * 返回token
     * @param callback
     */
    NativeJs.login = function (callback) {
        window['refreshtoken'] = function (result) {
            try {
                result = result;
            }
            catch (e) {
                console.log('出错！');
            }
            if (result) {
                callback(result);
                // window['userInfo'].access_token=result;
            }
        };
        return exports.baseNativeJs("refreshtoken");
    };
    /**
     * 刷新token
     */
    NativeJs.refreshtoken_load = function () {
        if (Utils_1.default.isApp()) {
            return exports.baseNativeJs("refreshtoken_reload");
        }
        else {
            Utils_1.default.redirectLogin();
        }
    };
    /**
     * 跳转支付
     * @param ref_id  产品id
     * @param ref_type 产品类型
     * @param buyCycle 限制体验支付，或者自实现支付列表的时候，需要传此参数
     */
    NativeJs.toPay = function (ref_id, ref_type, buyCycle) {
        // window['topay'] = function () {
        // 	delete window['topay'];
        // 	try {
        // 		// result = result;
        // 	} catch (e) {
        // 		console.log('出错！');
        // 	}
        // }
        return exports.baseNativeJs("topay", __assign({ id: ref_id, type: ref_type }, buyCycle), __assign({ ref_id: ref_id, ref_type: ref_type }, buyCycle));
    };
    /**
     * 应用内部跳转
     * @param router
     */
    NativeJs.gorouter = function (router, iosRouter) {
        return exports.baseNativeJs('gorouter', { router: router }, { router: iosRouter });
    };
    NativeJs.baseShare = function (name, sharevalue, footer) {
        if (footer === void 0) { footer = true; }
        var siteUrl = sharevalue.siteUrl, url = sharevalue.url, titleUrl = sharevalue.titleUrl, parameter = sharevalue.parameter, title = sharevalue.title, imageUrl = sharevalue.imageUrl, desc = sharevalue.desc, shareType = sharevalue.shareType, site = sharevalue.site;
        imageUrl = imageUrl || "https://m2.0606.com.cn/assets/images/logo.png";
        shareType = shareType || "all";
        site = site || "海纳智投";
        function replacePos(strObj, start, end, replacetext) {
            var str = strObj.substr(0, start) + replacetext + strObj.substring(end, strObj.length);
            return str;
        }
        function relaceUrl(url) {
            var start = url.indexOf("access_token");
            var isAccessToken = start > -1;
            var end = url.indexOf("&", start);
            var isMore = end > -1;
            if (isMore && isAccessToken) {
                return replacePos(url, start, end, "access_token=");
            }
            else if (isAccessToken) {
                return url.replace(/access_token=[\s\S]*/, 'access_token=');
            }
            return url;
        }
        if (Utils_1.default.isApp()) {
            if (footer) {
                if (window.location.search && window.location.search !== '') {
                    siteUrl = siteUrl + '&innerapp=hayner';
                    url = url + '&innerapp=hayner';
                    titleUrl = titleUrl + '&innerapp=hayner';
                }
                else {
                    siteUrl = siteUrl + '?innerapp=hayner';
                    url = url + '?innerapp=hayner';
                    titleUrl = titleUrl + '?innerapp=hayner';
                }
            }
            sharevalue = Object.assign({}, sharevalue, {
                siteUrl: relaceUrl(siteUrl),
                url: relaceUrl(url),
                titleUrl: relaceUrl(titleUrl),
                parameter: JSON.stringify(parameter),
                imageUrl: imageUrl,
                shareType: shareType,
                site: site
            });
            exports.baseNativeJs(name, { sharevalue: sharevalue });
        }
        else if (Utils_1.default.isWx()) {
            try {
                var mywx_1 = new WXClass_1.default();
                mywx_1.init(encodeURIComponent(location.href.split('#')[0])).then(function () {
                    mywx_1.wxshare({
                        title: title,
                        desc: desc,
                        link: url,
                        imgUrl: imageUrl
                    });
                });
            }
            catch (error) {
                console.error("微信分享出错");
            }
        }
        else if (Utils_1.default.isQQ()) {
            try {
                window["setShareInfo"]({
                    title: title,
                    summary: desc,
                    pic: imageUrl,
                    url: url // 分享链接
                });
            }
            catch (error) {
                console.error("QQ分享出错");
            }
        }
    };
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
    NativeJs.shareWeiXin = function (sharevalue, footer) {
        NativeJs.baseShare('shareWeiXin', sharevalue, footer);
    };
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
    NativeJs.shareFriends = function (sharevalue, footer) {
        NativeJs.baseShare('shareFriends', sharevalue, footer);
    };
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
    NativeJs.share = function (sharevalue, footer) {
        NativeJs.baseShare('share', sharevalue, footer);
    };
    /**
     *
     * @param product_id 适当性检测
     * @param risk_score
     */
    NativeJs.ihanerFSP = function (product_id, risk_score) {
        exports.baseNativeJs('ihanerFSP', { product_id: product_id, risk_score: risk_score });
    };
    /**
     *
     * @param 跳转
     */
    NativeJs.baseGoRouter = function (host, param) {
        var router = {
            host: host,
            param: typeof param === 'string' ? param : Object.keys(param).map(function (key) { return key + "=" + param[key]; }).join("&")
        };
        var IOSRouter = {
            data: param
        };
        var IOSRouterss = host + "param=" + JSON.stringify(IOSRouter);
        NativeJs.gorouter(JSON.stringify(router), IOSRouterss);
    };
    /**
     *
     * @param stocknSid 股票id
     */
    NativeJs.gotoStockDetailPage = function (stocknSid) {
        NativeJs.baseGoRouter('ihayner://stockdetail:11001?', stocknSid);
    };
    /**
     *
     * @param router跳转战队直播室
     * ihayner://homelive:10060?param={"data":"{\"liveRoomType\":0,\"roomId\":\"71314e37e7c790c95af57bcb\",\"serviceId\":\"558a3e9025ea5de341f5203d\",\"type\":0}","defaultParam":"2"}
     */
    NativeJs.gotoLiveDetailPage = function (liveType, roomId, serviceId) {
        var router = {
            host: "ihayner://homelive:10060?",
            param: {
                data: {
                    roomId: roomId,
                    serviceId: serviceId
                },
                defaultParam: liveType
            }
        };
        var IOSRouter = {
            data: {
                liveType: liveType,
                roomId: roomId,
                serviceId: serviceId
            },
            defaultParam: "2"
        };
        var IOSRouterss = "ihayner://homelive:10060?param=" + JSON.stringify(IOSRouter);
        NativeJs.gorouter(JSON.stringify(router), IOSRouterss);
    };
    /**
     *
     * @param router跳转直播列表
     */
    NativeJs.gotoLiveListPage = function () {
        NativeJs.baseGoRouter('ihayner://livelist_activity:10061?', "");
    };
    /**
     *
     * @param 跳转banner页
     */
    NativeJs.gotoBanner = function (bannerdata) {
        exports.baseNativeJs('banner', { bannerdata: bannerdata });
    };
    /**
     * 跳转首页
     */
    NativeJs.gotoHome = function () {
        NativeJs.baseGoRouter('ihayner://homepage:10002?', "");
    };
    /**
     * 跳转交易
     */
    NativeJs.tradeStock = function (stock_name, stock_code, buyorsell) {
        exports.baseNativeJs('tradeStock', { stock_name: stock_name, stock_code: stock_code, buyorsell: buyorsell });
    };
    /**
     * 点击放大图片
     */
    NativeJs.imageClick = function (img_url) {
        exports.baseNativeJs("imgClick", { img_url: img_url });
    };
    /**
     * 字体缩放
     */
    NativeJs.changeBodyFontSize = function (isshow, callback) {
        window['changeBodyFontSize'] = function (result) {
            // delete window['changeBodyFontSize']
            try {
                result = result;
            }
            catch (e) {
                console.log('出错！');
            }
            if (result) {
                callback(result);
                // window['userInfo'].access_token=result;
            }
        };
        exports.baseNativeJs("changeBodyFontSize", { isshow: isshow });
    };
    /**
     * 自选股添加和删除
     * @param stock_method 添加还是删除", （boolean值 默认false 删除）
     * @param stock_code 股票代码
     */
    NativeJs.optional = function (stock_method, stock_code) {
        exports.baseNativeJs("optional", { stock_method: stock_method, stock_code: stock_code });
    };
    /**
     * 获取埋点头
     */
    NativeJs.getRequestHead = function (callback) {
        window['getRequestHead'] = function (result) {
            delete window['getRequestHead'];
            try {
                if (typeof result === 'string') {
                    result = JSON.parse(result);
                }
                result = result;
            }
            catch (e) {
                console.log('出错！');
            }
            if (result) {
                callback(result);
            }
        };
        if (Utils_1.default.isApp()) {
            return exports.baseNativeJs("getRequestHead");
        }
        else {
            //暂时这样处理
            return callback({
                headEvents: window['HNtrack'].getHeadEvent
            });
        }
    };
    NativeJs.getPayRequestHead = function (callback) {
        window['getPayRequestHead'] = function (result) {
            delete window['getPayRequestHead'];
            try {
                if (typeof result === 'string') {
                    result = JSON.parse(result);
                }
                result = result;
            }
            catch (e) {
                console.log('出错！');
            }
            if (result) {
                callback(result);
            }
        };
        return exports.baseNativeJs("getPayRequestHead");
    };
    /**
     * 拨打电话
     */
    NativeJs.callphone = function (title, phone) {
        return exports.baseNativeJs("callphone", { title: title, phone: phone });
    };
    //返回上一级
    NativeJs.goBack = function () {
        return exports.baseNativeJs("backtofinish");
    };
    //ios改变状态栏颜色
    NativeJs.statusBarStyle = function (style) {
        if (Utils_1.default.isIOS()) {
            return exports.baseNativeJs("statusBarStyle", { style: style });
        }
    };
    NativeJs.gotoapp = function () {
        if (!Utils_1.default.isApp()) {
            window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.sz.nniu';
        }
    };
    NativeJs.cangoback = function (goback) {
        exports.baseNativeJs("cangoback", { goback: goback });
    };
    /**
     * 控制改变toolbar颜色与标题
     * @param title
     * @param color
     */
    NativeJs.toolbar = function (title, color) {
        exports.baseNativeJs("toolbar", { title: title, color: color });
    };
    /**
     * 通知原生请求失败
     */
    NativeJs.requestfailed = function () {
        exports.baseNativeJs("requestfailed");
    };
    /**
     *
     * @param user_id 开户
     * @param url
     */
    NativeJs.opAccount = function (user_id, url) {
        exports.baseNativeJs("opAccount", { user_id: user_id, url: url });
    };
    /**
     *
     * @param user_id 交易
     * @param company_id
     */
    NativeJs.trade = function (user_id, company_id) {
        exports.baseNativeJs("trade", { user_id: user_id, company_id: company_id });
    };
    NativeJs.bindAccount = function (user_id, company_id) {
        exports.baseNativeJs("bindAccount", { user_id: user_id, company_id: company_id });
    };
    /**
     * 唤起支付sdk
     * @param order_id
     * @param prepay
     * @param paymethod 1是微信，2是支付宝，3线下支付
     */
    NativeJs.getPayInfo = function (messageBody, callback) {
        window['getPayInfo'] = function (result) {
            delete window['getPayInfo'];
            try {
                callback(result);
            }
            catch (e) {
                console.log('出错！');
            }
        };
        exports.baseNativeJs("getPayInfo", { messageBody: messageBody });
    };
    /**
     * 直接调起适当性认证
     */
    NativeJs.startFsp = function (productId, riskScore) {
        exports.baseNativeJs("startFsp", { productId: productId, riskScore: riskScore });
    };
    /**
     * 线下支付提示
     */
    NativeJs.offlinePayAlertMessage = function () {
        exports.baseNativeJs("alertMessage");
    };
    /**
     * 海纳适当性页面 需要提示用户拨打电话时进行的弹框
     * @param phone 手机号码
     * @param content 显示内容
     * @param title 标题
     */
    NativeJs.callPhoneAlert = function (phone, content, title) {
        exports.baseNativeJs("callPhoneAlert", { phone: phone, content: content, title: title });
    };
    /**
     * 当购买业务时，如果用户不符合当前产品，弹框提示重新做或者打电话
     * @param phone
     * @param content
     * @param title
     * @param callback
     */
    NativeJs.riskAlert = function (phone, content, title, callback) {
        window['riskAlert'] = function (result) {
            delete window['riskAlert'];
            try {
                callback(result);
            }
            catch (e) {
                console.log('riskAlert出错！');
            }
        };
        exports.baseNativeJs("riskAlert", { phone: phone, content: content, title: title });
    };
    /**
     * 回调原声通知原声实名认证已经完成
     * @param name
     */
    NativeJs.authSuccess = function (name) {
        exports.baseNativeJs("authSuccess", { name: name });
    };
    /**
     * 回调风险测评成功
     * @param type_string 类型的名称 例如:稳健性，激进型
     * @param risk_score 风险测评的分数
     */
    NativeJs.riskSuccess = function (type_string, risk_score) {
        exports.baseNativeJs("riskSuccess", { type_string: type_string, risk_score: risk_score });
    };
    /** 通知原声app整个开通流程完毕 */
    NativeJs.confirmationSuccess = function () {
        exports.baseNativeJs("confirmationSuccess");
    };
    /**
     * 通知原声app适当性中途意外出错
     * @param err_code 后台返回的错误码
     * @param err_msg 接口返回的错误描述
     * @param fsp_type 1实名，2风险，3签署协议
     */
    NativeJs.fspFailed = function (err_code, err_msg, fsp_type) {
        exports.baseNativeJs("fspFailed", { err_code: err_code, err_msg: err_msg, fsp_type: fsp_type });
    };
    /** h5红包关闭按钮 */
    NativeJs.closePoup = function () {
        exports.baseNativeJs('closePoup');
    };
    /**
     * 调用原生发送验证码
     * @param phone 手机号
     */
    NativeJs.sendCodeToH5 = function (phone) {
        exports.baseNativeJs('sendCodeToH5', { phone: phone });
    };
    /**
     * h5通知app快速登录
     * @param phone  手机号
     * @param code 验证码
     */
    NativeJs.hbLogin = function (phone, code, callback) {
        window['hbLogin'] = function (result) {
            delete window['hbLogin'];
            try {
                callback(result);
            }
            catch (e) {
                console.log('hbLogin出错！');
            }
        };
        exports.baseNativeJs('hbLogin', { phone: phone, code: code });
    };
    NativeJs.getHomeActivityData = function (callback) {
        window['getHomeActivityData'] = function (result) {
            delete window['getHomeActivityData'];
            try {
                callback(result);
            }
            catch (e) {
                console.log('getHomeActivityData出错！');
            }
        };
        exports.baseNativeJs('getHomeActivityData');
    };
    /**
     * 关闭容器
     */
    NativeJs.controlFinish = function () {
        exports.baseNativeJs("controlFinish");
    };
    /**
     * 原生goback,返回上一页，有则返回，没有则关闭容器
     */
    NativeJs.appBack = function () {
        exports.baseNativeJs("appBack");
    };
    return NativeJs;
}());
exports.default = NativeJs;
window["NativeJs"] = NativeJs;

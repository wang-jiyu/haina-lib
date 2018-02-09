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
};
var NativeClass = /** @class */ (function () {
    function NativeClass() {
    }
    NativeClass.prototype.baseWindow = function (funcName) {
        window[funcName] = function () {
            delete window[funcName];
        };
    };
    /**
     * 登陆
     * 返回token
     * @param callback
     */
    NativeClass.prototype.login = function (callback) {
        window['refreshtoken'] = function (result) {
            delete window['refreshtoken'];
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
    NativeClass.prototype.refreshtoken_load = function () {
        return exports.baseNativeJs("refreshtoken_reload");
    };
    /**
     * 跳转支付
     * @param ref_id  产品id
     * @param ref_type 产品类型
     * @param buyCycle 限制体验支付，或者自实现支付列表的时候，需要传此参数
     */
    NativeClass.prototype.toPay = function (ref_id, ref_type, buyCycle) {
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
    NativeClass.prototype.gorouter = function (router, iosRouter) {
        return exports.baseNativeJs('gorouter', { router: router }, { router: iosRouter });
    };
    NativeClass.prototype.baseShare = function (name, sharevalue) {
        var siteUrl = sharevalue.siteUrl, url = sharevalue.url, titleUrl = sharevalue.titleUrl, parameter = sharevalue.parameter, title = sharevalue.title, imageUrl = sharevalue.imageUrl, desc = sharevalue.desc;
        if (Utils_1.default.isApp()) {
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
            sharevalue = Object.assign({}, sharevalue, {
                siteUrl: relaceUrl(siteUrl),
                url: relaceUrl(url),
                titleUrl: relaceUrl(titleUrl),
                parameter: JSON.stringify(parameter)
            });
            exports.baseNativeJs(name, { sharevalue: sharevalue });
        }
        else if (Utils_1.default.isWx()) {
            Utils_1.default.loadOutJS("https://res.wx.qq.com/open/js/jweixin-1.2.0.js");
            try {
                var mywx_1 = new WXClass_1.default();
                mywx_1.init(window.location.href).then(function () {
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
    NativeClass.prototype.shareWeiXin = function (sharevalue) {
        this.baseShare('shareWeiXin', sharevalue);
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
    NativeClass.prototype.shareFriends = function (sharevalue) {
        this.baseShare('shareFriends', sharevalue);
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
    NativeClass.prototype.share = function (sharevalue) {
        this.baseShare('share', sharevalue);
    };
    /**
     *
     * @param product_id 适当性检测
     * @param risk_score
     */
    NativeClass.prototype.ihanerFSP = function (product_id, risk_score) {
        exports.baseNativeJs('ihanerFSP', { product_id: product_id, risk_score: risk_score });
    };
    /**
     *
     * @param 跳转
     */
    NativeClass.prototype.baseGoRouter = function (host, param) {
        var router = {
            host: host,
            param: typeof param === 'string' ? param : Object.keys(param).map(function (key) { return key + "=" + param[key]; }).join("&")
        };
        var IOSRouter = {
            data: param
        };
        var IOSRouterss = host + "param=" + JSON.stringify(IOSRouter);
        this.gorouter(JSON.stringify(router), IOSRouterss);
    };
    /**
     *
     * @param stocknSid 股票id
     */
    NativeClass.prototype.gotoStockDetailPage = function (stocknSid) {
        this.baseGoRouter('ihayner://stockdetail:11001?', stocknSid);
    };
    /**
     *
     * @param router跳转战队直播室
     * ihayner://homelive:10060?param={"data":"{\"liveRoomType\":0,\"roomId\":\"71314e37e7c790c95af57bcb\",\"serviceId\":\"558a3e9025ea5de341f5203d\",\"type\":0}","defaultParam":"2"}
     */
    NativeClass.prototype.gotoLiveDetailPage = function (liveType, roomId, serviceId) {
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
        this.gorouter(JSON.stringify(router), IOSRouterss);
    };
    /**
     *
     * @param router跳转直播列表
     */
    NativeClass.prototype.gotoLiveListPage = function () {
        this.baseGoRouter('ihayner://livelist_activity:10061?', "");
    };
    /**
     *
     * @param 跳转banner页
     */
    NativeClass.prototype.gotoBanner = function (bannerdata) {
        exports.baseNativeJs('banner', { bannerdata: bannerdata });
    };
    /**
     * 跳转首页
     */
    NativeClass.prototype.gotoHome = function () {
        this.baseGoRouter('ihayner://homepage:10002?', "");
    };
    /**
     * 跳转交易
     */
    NativeClass.prototype.tradeStock = function (stock_name, stock_code, buyorsell) {
        exports.baseNativeJs('tradeStock', { stock_name: stock_name, stock_code: stock_code, buyorsell: buyorsell });
    };
    /**
     * 点击放大图片
     */
    NativeClass.prototype.imageClick = function (img_url) {
        exports.baseNativeJs("imgClick", { img_url: img_url });
    };
    /**
     * 字体缩放
     */
    NativeClass.prototype.changeBodyFontSize = function (isshow, callback) {
        window['changeBodyFontSize'] = function (result) {
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
    NativeClass.prototype.optional = function (stock_method, stock_code) {
        exports.baseNativeJs("optional", { stock_method: stock_method, stock_code: stock_code });
    };
    /**
     * 获取埋点头
     */
    NativeClass.prototype.getRequestHead = function (callback) {
        window['getRequestHead'] = function (result) {
            delete window['getRequestHead'];
            try {
                result = result;
            }
            catch (e) {
                console.log('出错！');
            }
            if (result) {
                callback(result);
            }
        };
        return exports.baseNativeJs("getRequestHead");
    };
    /**
     * 拨打电话
     */
    NativeClass.prototype.callphone = function (title, phone) {
        return exports.baseNativeJs("callphone", { title: title, phone: phone });
    };
    return NativeClass;
}());
exports.default = NativeClass;

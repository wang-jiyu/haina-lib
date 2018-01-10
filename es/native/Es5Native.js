if (typeof Object.assign != 'function') {
    // Must be writable: true, enumerable: false, configurable: true
    Object.defineProperty(Object, "assign", {
        value: function assign(target, varArgs) {
            'use strict';
            if (target == null) {
                throw new TypeError('Cannot convert undefined or null to object');
            }
            var to = Object(target);
            for (var index = 1; index < arguments.length; index++) {
                var nextSource = arguments[index];
                if (nextSource != null) {
                    for (var nextKey in nextSource) {
                        // Avoid bugs when hasOwnProperty is shadowed
                        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                            to[nextKey] = nextSource[nextKey];
                        }
                    }
                }
            }
            return to;
        },
        writable: true,
        configurable: true
    });
}
import Utils from '../utils/Utils';
const baseNativeJs = (funcName, params, ios) => {
    if (Utils.isApp()) {
        if (typeof window['webkit'] != 'undefined') {
            const realParam = ios ? Object.assign({}, {
                "nativeCallJS": funcName
            }, Object.assign({}, ios)) : Object.assign({}, {
                "nativeCallJS": funcName
            }, Object.assign({}, params));
            window['webkit'].messageHandlers.jsCallNative.postMessage(realParam);
        }
        else if (/Android/i.test(window.navigator.userAgent)) {
            const realParam = Object.assign({}, {
                "nativecalljs": funcName
            }, Object.assign({}, params)); //android
            const paramstr = JSON.stringify(realParam);
            window['haina'].pushEvent(paramstr);
        }
    }
    else {
        if (Utils.isIOS()) {
            /* EXACT:http://m-test.0606.com.cn/diagnose/js/floatwindow.js*/
            // window.location.href = 'ihayner://diagnosis_stock_activity:10050';
            // setTimeout(function () { window.location.href = 'itms-apps://itunes.apple.com/app/id1236797754' }, 1000);
        }
        else if (Utils.isAndroid()) {
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
class NativeJs {
    static baseWindow(funcName) {
        window[funcName] = function () {
            delete window[funcName];
        };
    }
    /**
     * 登陆
     * 返回token
     * @param callback
     */
    static login(callback) {
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
        return baseNativeJs("refreshtoken");
    }
    /**
     * 刷新token
     */
    static refreshtoken_load() {
        return baseNativeJs("refreshtoken_reload");
    }
    /**
     * 跳转支付
     * @param ref_id  产品id
     * @param ref_type 产品类型
     * @param buyCycle 限制体验支付，或者自实现支付列表的时候，需要传此参数
     */
    static toPay(ref_id, ref_type, buyCycle) {
        // window['topay'] = function () {
        // 	delete window['topay'];
        // 	try {
        // 		// result = result;
        // 	} catch (e) {
        // 		console.log('出错！');
        // 	}
        // }
        return baseNativeJs("topay", Object.assign({ id: ref_id, type: ref_type }, buyCycle), Object.assign({ ref_id, ref_type }, buyCycle));
    }
    /**
     * 应用内部跳转
     * @param router
     */
    static gorouter(router, iosRouter) {
        return baseNativeJs('gorouter', { router }, { router: iosRouter });
    }
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
    static shareWeiXin(sharevalue) {
        baseNativeJs('shareWeiXin', { sharevalue });
    }
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
    static shareFriends(sharevalue) {
        baseNativeJs('shareFriends', { sharevalue });
    }
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
    static share(sharevalue) {
        baseNativeJs('share', { sharevalue });
    }
    /**
     *
     * @param product_id 适当性检测
     * @param risk_score
     */
    static ihanerFSP(product_id, risk_score) {
        baseNativeJs('ihanerFSP', { product_id, risk_score });
    }
    /**
     *
     * @param 跳转
     */
    static baseGoRouter(host, param) {
        const router = {
            host: host,
            param: typeof param === 'string' ? param : Object.keys(param).map((key) => `${key}=${param[key]}`).join("&")
        };
        const IOSRouter = {
            data: param
        };
        const IOSRouterss = `${host}param=${JSON.stringify(IOSRouter)}`;
        NativeJs.gorouter(JSON.stringify(router), IOSRouterss);
    }
    /**
     *
     * @param stocknSid 股票id
     */
    static gotoStockDetailPage(stocknSid) {
        NativeJs.baseGoRouter('ihayner://stockdetail:11001?', stocknSid);
    }
    /**
     *
     * @param router跳转战队直播室
     * ihayner://homelive:10060?param={"data":"{\"liveRoomType\":0,\"roomId\":\"71314e37e7c790c95af57bcb\",\"serviceId\":\"558a3e9025ea5de341f5203d\",\"type\":0}","defaultParam":"2"}
     */
    static gotoLiveDetailPage(liveType, roomId, serviceId) {
        const router = {
            host: `ihayner://homelive:10060?`,
            param: {
                data: {
                    roomId: roomId,
                    serviceId
                },
                defaultParam: liveType
            }
        };
        const IOSRouter = {
            data: {
                liveType: liveType,
                roomId: roomId,
                serviceId: serviceId
            },
            defaultParam: "2"
        };
        const IOSRouterss = `ihayner://homelive:10060?param=${JSON.stringify(IOSRouter)}`;
        NativeJs.gorouter(JSON.stringify(router), IOSRouterss);
    }
    /**
     *
     * @param router跳转直播列表
     */
    static gotoLiveListPage() {
        NativeJs.baseGoRouter('ihayner://livelist_activity:10061?', "");
    }
    /**
     *
     * @param 跳转banner页
     */
    static gotoBanner(bannerdata) {
        baseNativeJs('banner', { bannerdata });
    }
    /**
     * 跳转首页
     */
    static gotoHome() {
        NativeJs.baseGoRouter('ihayner://homepage:10002?', "");
    }
    /**
     * 跳转交易
     */
    static tradeStock(stock_name, stock_code, buyorsell) {
        baseNativeJs('tradeStock', { stock_name, stock_code, buyorsell });
    }
    /**
     * 跳转策略详情
     */
    static operationboarddetail(strategyId) {
        NativeJs.baseGoRouter('ihayner://operationboarddetail:10033?', { id: strategyId });
    }
}
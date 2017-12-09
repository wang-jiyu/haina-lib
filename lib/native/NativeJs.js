var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.baseNativeJs = function (funcName, params, ios) {
        if (typeof window['webkit'] != 'undefined') {
            var realParam = ios ? Object.assign({}, {
                "nativeCallJS": funcName
            }, __assign({}, ios)) : Object.assign({}, {
                "nativeCallJS": funcName
            }, __assign({}, params));
            window['webkit'].messageHandlers.jsCallNative.postMessage(realParam);
        }
        else if (/Android/i.test(window.navigator.userAgent)) {
            var realParam = Object.assign({}, {
                "nativecalljs": funcName
            }, __assign({}, params));
            var paramstr = JSON.stringify(realParam);
            window['haina'].pushEvent(paramstr);
        }
    };
    var NativeJs = (function () {
        function NativeJs() {
        }
        NativeJs.login = function (callback) {
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
                }
            };
            return exports.baseNativeJs("refreshtoken");
        };
        NativeJs.toPay = function (ref_id, ref_type, buyCycle) {
            return exports.baseNativeJs("topay", __assign({ id: ref_id, type: ref_type }, buyCycle), __assign({ ref_id: ref_id, ref_type: ref_type }, buyCycle));
        };
        NativeJs.gorouter = function (router, iosRouter) {
            return exports.baseNativeJs('gorouter', { router: router }, { router: iosRouter });
        };
        NativeJs.shareWeiXin = function (shareValue) {
            exports.baseNativeJs('shareWeiXin', shareValue);
        };
        NativeJs.shareFriends = function (shareValue) {
            exports.baseNativeJs('shareFriends', shareValue);
        };
        NativeJs.share = function (shareValue) {
            exports.baseNativeJs('shareFriends', shareValue);
        };
        NativeJs.ihanerFSP = function (product_id, risk_score) {
            exports.baseNativeJs('ihanerFSP', { product_id: product_id, risk_score: risk_score });
        };
        NativeJs.gotoStockDetailPage = function (stocknSid) {
            exports.baseNativeJs('gotoStockDetailPage', { stocknSid: stocknSid });
        };
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
            var IOSRouter = "ihayner://homelive:10060?param={\"data\":\"{\"liveType\":" + liveType + ",\"roomId\":\"" + roomId + "\",\"serviceId\":\"" + serviceId + "\"}\",\"defaultParam\":\"2\"}";
            NativeJs.gorouter(JSON.stringify(router), IOSRouter);
        };
        return NativeJs;
    }());
    exports.default = NativeJs;
});

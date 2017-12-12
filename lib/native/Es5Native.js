var __assign = (this && this.__assign) || Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
if (typeof Object.assign != 'function') {
    // Must be writable: true, enumerable: false, configurable: true
    Object.defineProperty(Object, "assign", {
        value: function assign(target, varArgs) { // .length of function is 2
            'use strict';
            if (target == null) { // TypeError if undefined or null
                throw new TypeError('Cannot convert undefined or null to object');
            }

            var to = Object(target);

            for (var index = 1; index < arguments.length; index++) {
                var nextSource = arguments[index];

                if (nextSource != null) { // Skip over if undefined or null
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
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var baseNativeJs = function (funcName, params, ios) {
        console.log("funcName", funcName);
        console.log("params", params);
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
            return baseNativeJs("refreshtoken");
        };
        NativeJs.toPay = function (ref_id, ref_type, buyCycle) {
            return baseNativeJs("topay", __assign({ id: ref_id, type: ref_type }, buyCycle), __assign({ ref_id: ref_id, ref_type: ref_type }, buyCycle));
        };
        NativeJs.gorouter = function (router, iosRouter) {
            return baseNativeJs('gorouter', { router: router }, { router: iosRouter });
        };
        NativeJs.shareWeiXin = function (shareValue) {
            baseNativeJs('shareWeiXin', shareValue);
        };
        NativeJs.shareFriends = function (shareValue) {
            baseNativeJs('shareFriends', shareValue);
        };
        NativeJs.share = function (shareValue) {
            baseNativeJs('shareFriends', shareValue);
        };
        NativeJs.ihanerFSP = function (product_id, risk_score) {
            baseNativeJs('ihanerFSP', { product_id: product_id, risk_score: risk_score });
        };
        NativeJs.gotoStockDetailPage = function (stocknSid) {
            baseNativeJs('gotoStockDetailPage', { stocknSid: stocknSid });
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
        return NativeJs;
    }());
});

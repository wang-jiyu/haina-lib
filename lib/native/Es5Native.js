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
if (typeof Object.assign != 'function') {
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
var baseNativeJs = function (funcName, params, ios) {
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
    NativeJs.baseWindow = function (funcName) {
        window[funcName] = function () {
            delete window[funcName];
        };
    };
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
    NativeJs.refreshtoken_load = function () {
        return baseNativeJs("refreshtoken_reload");
    };
    NativeJs.toPay = function (ref_id, ref_type, buyCycle) {
        return baseNativeJs("topay", __assign({ id: ref_id, type: ref_type }, buyCycle), __assign({ ref_id: ref_id, ref_type: ref_type }, buyCycle));
    };
    NativeJs.gorouter = function (router, iosRouter) {
        return baseNativeJs('gorouter', { router: router }, { router: iosRouter });
    };
    NativeJs.shareWeiXin = function (shareValue) {
        baseNativeJs('shareWeiXin', { shareValue: shareValue });
    };
    NativeJs.shareFriends = function (shareValue) {
        baseNativeJs('shareFriends', { shareValue: shareValue });
    };
    NativeJs.share = function (sharevalue) {
        baseNativeJs('share', { sharevalue: sharevalue });
    };
    NativeJs.ihanerFSP = function (product_id, risk_score) {
        baseNativeJs('ihanerFSP', { product_id: product_id, risk_score: risk_score });
    };
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
    NativeJs.gotoStockDetailPage = function (stocknSid) {
        NativeJs.baseGoRouter('ihayner://stockdetail:11001?', stocknSid);
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
    NativeJs.gotoLiveListPage = function () {
        NativeJs.baseGoRouter('ihayner://livelist_activity:10061?', "");
    };
    return NativeJs;
}());

define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.baseNativeJs = (funcName, params, ios) => {
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
            }, Object.assign({}, params));
            const paramstr = JSON.stringify(realParam);
            window['haina'].pushEvent(paramstr);
        }
    };
    class NativeJs {
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
                }
            };
            return exports.baseNativeJs("refreshtoken");
        }
        static toPay(ref_id, ref_type, buyCycle) {
            return exports.baseNativeJs("topay", Object.assign({ id: ref_id, type: ref_type }, buyCycle), Object.assign({ ref_id, ref_type }, buyCycle));
        }
        static gorouter(router, iosRouter) {
            return exports.baseNativeJs('gorouter', { router }, { router: iosRouter });
        }
        static shareWeiXin(shareValue) {
            exports.baseNativeJs('shareWeiXin', shareValue);
        }
        static shareFriends(shareValue) {
            exports.baseNativeJs('shareFriends', shareValue);
        }
        static share(shareValue) {
            exports.baseNativeJs('shareFriends', shareValue);
        }
        static ihanerFSP(product_id, risk_score) {
            exports.baseNativeJs('ihanerFSP', { product_id, risk_score });
        }
        static gotoStockDetailPage(stocknSid) {
            exports.baseNativeJs('gotoStockDetailPage', { stocknSid });
        }
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
            const IOSRouter = `ihayner://homelive:10060?param={"data":"{\"liveType\":${liveType},\"roomId\":\"${roomId}\",\"serviceId\":\"${serviceId}\"}","defaultParam":"2"}`;
            NativeJs.gorouter(JSON.stringify(router), IOSRouter);
        }
    }
    exports.default = NativeJs;
});

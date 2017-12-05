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
        static gorouter(router) {
            return exports.baseNativeJs('gorouter', { router });
        }
    }
    exports.default = NativeJs;
});

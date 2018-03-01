"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HttpClient_1 = require("../httpUtils/HttpClient");
var WXClass = /** @class */ (function () {
    function WXClass() {
        this.h5api = {
            production: 'https://h5api.0606.com.cn',
            test: 'https://h5api-test.0606.com.cn',
            test2: 'https://h5api-test.0606.com.cn',
            dev1: 'https://h5api-test.0606.com.cn',
            dev2: 'https://h5api-test.0606.com.cn',
            bug: 'https://h5api-test.0606.com.cn',
            sh: "http://h5api-test.0606.com.cn",
            development: '/h5api'
        };
        // this.init(url)
    }
    WXClass.prototype.getEnv = function () {
        if (process && process.env.NODE_ENV === 'development') {
            return 'development';
        }
        else {
            var env = 'production';
            if (window.location.hostname.split('.').length > 0) {
                var hostname = window.location.hostname.split('.')[0];
                if (hostname.indexOf("-") > -1) {
                    env = hostname.substring(hostname.indexOf("-") + 1);
                    // env = 'testing'
                }
                if (hostname.indexOf("mobilesh") > -1) {
                    env = "sh";
                }
            }
            return env;
        }
    };
    WXClass.prototype.getH5api = function () {
        return this.h5api[this.getEnv()];
    };
    WXClass.prototype.init = function (url) {
        return HttpClient_1.default.get(this.getH5api(), '/wxapi/wechat-signature', {
            params: {
                url: url
            }
        }).then(function (res) {
            console.log(res);
            window['wx'].config(res);
            window['wx'].error(function (res) {
                // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
                console.log(res);
            });
        }).catch(function (res) {
            console.log('微信授权失败');
        });
    };
    WXClass.prototype.wxshare = function (config) {
        var title = config.title, desc = config.desc, link = config.link, imgUrl = config.imgUrl, type = config.type, dataUrl = config.dataUrl, success = config.success, cancel = config.cancel;
        window['wx'].ready(function () {
            //分享给朋友
            window['wx'].onMenuShareAppMessage({
                title: title,
                desc: desc,
                link: link,
                imgUrl: imgUrl,
                type: type,
                dataUrl: dataUrl,
                success: function () {
                    // 用户确认分享后执行的回调函数
                    if (success) {
                        success();
                    }
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                    if (cancel) {
                        cancel();
                    }
                }
            });
            //分享到朋友圈
            window['wx'].onMenuShareTimeline({
                title: title,
                link: link,
                imgUrl: imgUrl,
                success: function () {
                    // 用户确认分享后执行的回调函数
                    if (success) {
                        success();
                    }
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                    if (cancel) {
                        cancel();
                    }
                }
            });
            //分享到qq
            window['wx'].onMenuShareQQ({
                title: title,
                desc: desc,
                link: link,
                imgUrl: imgUrl,
                success: function () {
                    // 用户确认分享后执行的回调函数
                    if (success) {
                        success();
                    }
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                    if (cancel) {
                        cancel();
                    }
                }
            });
            //分享到微博
            window['wx'].onMenuShareWeibo({
                title: title,
                desc: desc,
                link: link,
                imgUrl: imgUrl,
                success: function () {
                    // 用户确认分享后执行的回调函数
                    if (success) {
                        success();
                    }
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                    if (cancel) {
                        cancel();
                    }
                }
            });
            //分享到QQ空间
            window['wx'].onMenuShareQZone({
                title: title,
                desc: desc,
                link: link,
                imgUrl: imgUrl,
                success: function () {
                    // 用户确认分享后执行的回调函数
                    success();
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                    if (cancel) {
                        cancel();
                    }
                }
            });
        });
    };
    return WXClass;
}());
exports.default = WXClass;

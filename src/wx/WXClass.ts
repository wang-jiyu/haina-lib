

import HttpClient from '../httpUtils/HttpClient'
export default class WXClass {

    h5api = {
        production: 'https://h5api.0606.com.cn',
        test: 'http://h5api-test.0606.com.cn',
        test2: 'http://h5api-test.0606.com.cn',
        dev1: 'http://h5api-test.0606.com.cn',
        dev2: 'http://h5api-test.0606.com.cn',
        bug: 'http://h5api-test.0606.com.cn',
        sh: "http://h5api-test.0606.com.cn",
        development: '/h5api'
    }

    getEnv() {
        if (process && process.env.NODE_ENV === 'development') {
            return 'development'
        } else {
            let env = 'production'
            if (window.location.hostname.split('.').length > 0) {
                let hostname = window.location.hostname.split('.')[0]
                if (hostname.indexOf("-") > -1) {
                    env = hostname.substring(hostname.indexOf("-") + 1)
                    // env = 'testing'
                }
                if (hostname.indexOf("mobilesh") > -1) {
                    env = "sh"
                }
            }
            return env
        }
    }

    getH5api() {
        return this.h5api[this.getEnv()]
    }

    init(url) {
        return HttpClient.get(this.getH5api(), '/wxapi/wechat-signature', {
            params: {
                url: url
            }
        }).then(res => {
            console.log(res)
            window['wx'].config(res)
            window['wx'].error(function(res){
                // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
                console.log(res)
            });
        }).catch(res => {
            console.log('微信授权失败')
        })
    }

    constructor() {
        // this.init(url)
    }

    wxshare(config: {
        title: string,
        desc?: string,
        link: string,
        imgUrl: string,
        type?: string,
        dataUrl?: string,
        success?: Function,
        cancel?: Function
    }) {
        const { title, desc, link, imgUrl, type, dataUrl, success, cancel } = config
        window['wx'].ready(() => {
            //分享给朋友
            window['wx'].onMenuShareAppMessage({
                title: title, // 分享标题
                desc: desc, // 分享描述
                link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: imgUrl, // 分享图标
                type: type, // 分享类型,music、video或link，不填默认为link
                dataUrl: dataUrl, // 如果type是music或video，则要提供数据链接，默认为空
                success: function () {
                    // 用户确认分享后执行的回调函数
                    if (success) {
                        success()
                    }
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                    if (cancel) {
                        cancel()
                    }
                }
            })

            //分享到朋友圈
            window['wx'].onMenuShareTimeline({
                title: title, // 分享标题
                link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: imgUrl, // 分享图标
                success: function () {
                    // 用户确认分享后执行的回调函数
                    if (success) {
                        success()
                    }
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                    if (cancel) {
                        cancel()
                    }
                }
            })
            //分享到qq
            window['wx'].onMenuShareQQ({
                title: title, // 分享标题
                desc: desc, // 分享描述
                link: link, // 分享链接
                imgUrl: imgUrl, // 分享图标
                success: function () {
                    // 用户确认分享后执行的回调函数
                    if (success) {
                        success()
                    }
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                    if (cancel) {
                        cancel()
                    }
                }
            })
            //分享到微博
            window['wx'].onMenuShareWeibo({
                title: title, // 分享标题
                desc: desc, // 分享描述
                link: link, // 分享链接
                imgUrl: imgUrl, // 分享图标
                success: function () {
                    // 用户确认分享后执行的回调函数
                    if (success) {
                        success()
                    }
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                    if (cancel) {
                        cancel()
                    }
                }
            })

            //分享到QQ空间
            window['wx'].onMenuShareQZone({
                title: title, // 分享标题
                desc: desc, // 分享描述
                link: link, // 分享链接
                imgUrl: imgUrl, // 分享图标
                success: function () {
                    // 用户确认分享后执行的回调函数
                    success()
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                    if (cancel) {
                        cancel()
                    }
                }
            })
        })
    }
} 
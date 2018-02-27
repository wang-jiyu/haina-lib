
import Utils from '../utils/Utils'
import WXClass from '../wx/WXClass'
export const baseNativeJs = (funcName: string, params?: object, ios?: object) => {
	if (Utils.isApp()) {
		if (typeof window['webkit'] != 'undefined') {
			const realParam = ios ? Object.assign({}, {
				"nativeCallJS": funcName
			}, { ...ios }) : Object.assign({}, {
				"nativeCallJS": funcName
			}, { ...params })
			console.log("nativeparam", realParam)
			window['webkit'].messageHandlers.jsCallNative.postMessage(realParam);
		} else if (/Android/i.test(window.navigator.userAgent)) {
			const realParam = Object.assign({}, {
				"nativecalljs": funcName
			}, { ...params })				       //android
			const paramstr = JSON.stringify(realParam)
			console.log("nativeparam", paramstr)
			window['haina'].pushEvent(paramstr);
		}
	} else {
		if (Utils.isIOS()) { //ios
			/* EXACT:http://m-test.0606.com.cn/diagnose/js/floatwindow.js*/
			// window.location.href = 'ihayner://diagnosis_stock_activity:10050';
			// setTimeout(function () { window.location.href = 'itms-apps://itunes.apple.com/app/id1236797754' }, 1000);
		} else if (Utils.isAndroid()) { //android
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
export default class NativeJs {
	static baseWindow(funcName: string) {
		window[funcName] = function () {
			delete window[funcName];
		}
	}
	/**
	 * 登陆
	 * 返回token
	 * @param callback 
	 */
	static login(callback: Function): any {
		window['refreshtoken'] = function (result: any) {
			delete window['refreshtoken'];
			try {
				result = result;
			} catch (e) {
				console.log('出错！');
			}
			if (result) {
				callback(result);
				// window['userInfo'].access_token=result;
			}
		}
		return baseNativeJs("refreshtoken")
	}

	/**
	 * 刷新token
	 */
	static refreshtoken_load(): any {

		return baseNativeJs("refreshtoken_reload")
	}

	/**
	 * 跳转支付
	 * @param ref_id  产品id
	 * @param ref_type 产品类型
	 * @param buyCycle 限制体验支付，或者自实现支付列表的时候，需要传此参数
	 */
	static toPay(ref_id: any, ref_type: any, buyCycle?: object): any {
		// window['topay'] = function () {
		// 	delete window['topay'];
		// 	try {
		// 		// result = result;
		// 	} catch (e) {
		// 		console.log('出错！');
		// 	}
		// }
		return baseNativeJs("topay", { id: ref_id, type: ref_type, ...buyCycle }, { ref_id, ref_type, ...buyCycle });
	}

	/**
	 * 应用内部跳转
	 * @param router 
	 */
	static gorouter(router: string, iosRouter: string): any {
		return baseNativeJs('gorouter', { router }, { router: iosRouter })
	}

	static baseShare(name, sharevalue: {
		"desc": string,
		"imageUrl": string,
		"shareType": string,
		"site": string,
		"siteUrl": string,
		"title": string,
		"titleUrl": string,
		"url": string,
		"eventId"?: string,
		"parameter"?: Object
	}) {
		let { siteUrl, url, titleUrl, parameter, title, imageUrl, desc, shareType, site } = sharevalue
		imageUrl = imageUrl || "https://m2.0606.com.cn/assets/images/logo.png"
		shareType = shareType || "all"
		site = site || "海纳智投"
		function replacePos(strObj, start, end, replacetext) {
			var str = strObj.substr(0, start) + replacetext + strObj.substring(end, strObj.length);
			return str;
		}
		function relaceUrl(url) {
			let start = url.indexOf("access_token")
			let isAccessToken = start > -1
			let end = url.indexOf("&", start)
			let isMore = end > -1
			if (isMore && isAccessToken) {
				return replacePos(url, start, end, "access_token=")
			} else if (isAccessToken) {
				return url.replace(/access_token=[\s\S]*/, 'access_token=')
			}
			return url
		}
		if (Utils.isApp()) {
			if (window.location.search && window.location.search !== '') {
				siteUrl = siteUrl + '&innerapp=hayner'
				url = url + '&innerapp=hayner'
				titleUrl = titleUrl + '&innerapp=hayner'
			} else {
				siteUrl = siteUrl + '?innerapp=hayner'
				url = url + '?innerapp=hayner'
				titleUrl = titleUrl + '?innerapp=hayner'
			}

			sharevalue = Object.assign({}, sharevalue, {
				siteUrl: relaceUrl(siteUrl),
				url: relaceUrl(url),
				titleUrl: relaceUrl(titleUrl),
				parameter: JSON.stringify(parameter),
				imageUrl,
				shareType,
				site
			})
			baseNativeJs(name, { sharevalue })
		} else if (Utils.isWx()) {
			try {
				const mywx = new WXClass()
				mywx.init(encodeURIComponent(location.href.split('#')[0])).then(() => {
					mywx.wxshare({
						title,
						desc,
						link: url,
						imgUrl: imageUrl
					})
				})
			} catch (error) {
				console.error("微信分享出错")
			}
		}
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
	static shareWeiXin(sharevalue: {
		"desc": string,
		"imageUrl": string,
		"shareType": string,
		"site": string,
		"siteUrl": string,
		"title": string,
		"titleUrl": string,
		"url": string,
		"eventId"?: string,
		"parameter"?: Object
	}) {
		NativeJs.baseShare('shareWeiXin', sharevalue)
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
	static shareFriends(sharevalue: {
		"desc": string,
		"imageUrl": string,
		"shareType": string,
		"site": string,
		"siteUrl": string,
		"title": string,
		"titleUrl": string,
		"url": string,
		"eventId"?: string,
		"parameter"?: Object
	}) {
		NativeJs.baseShare('shareFriends', sharevalue)
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
	static share(sharevalue: {
		"desc": string,
		"imageUrl": string,
		"shareType": string,
		"site": string,
		"siteUrl": string,
		"title": string,
		"titleUrl": string,
		"url": string,
		"eventId"?: string,
		"parameter"?: Object
	}) {
		NativeJs.baseShare('share', sharevalue)
	}


    /**
     * 
     * @param product_id 适当性检测
     * @param risk_score 
     */

	static ihanerFSP(product_id: string, risk_score: string) {
		baseNativeJs('ihanerFSP', { product_id, risk_score })
	}

	/**
	 * 
	 * @param 跳转
	 */
	static baseGoRouter(host: string, param: string | object) {
		const router = {
			host: host,
			param: typeof param === 'string' ? param : Object.keys(param).map((key) => `${key}=${param[key]}`).join("&")
		}

		const IOSRouter = {
			data: param
		};
		const IOSRouterss = `${host}param=${JSON.stringify(IOSRouter)}`
		NativeJs.gorouter(JSON.stringify(router), IOSRouterss)
	}

	/**
	 * 
	 * @param stocknSid 股票id
	 */
	static gotoStockDetailPage(stocknSid: string) {
		NativeJs.baseGoRouter('ihayner://stockdetail:11001?', stocknSid)
	}

	/**
	 * 
	 * @param router跳转战队直播室 
	 * ihayner://homelive:10060?param={"data":"{\"liveRoomType\":0,\"roomId\":\"71314e37e7c790c95af57bcb\",\"serviceId\":\"558a3e9025ea5de341f5203d\",\"type\":0}","defaultParam":"2"}
	 */
	static gotoLiveDetailPage(liveType: string, roomId: string, serviceId: string) {

		const router = {
			host: `ihayner://homelive:10060?`,
			param: {
				data: {
					roomId: roomId,
					serviceId
				},
				defaultParam: liveType
			}
		}

		const IOSRouter = {
			data: {
				liveType: liveType,
				roomId: roomId,
				serviceId: serviceId
			},
			defaultParam: "2"
		};
		const IOSRouterss = `ihayner://homelive:10060?param=${JSON.stringify(IOSRouter)}`
		NativeJs.gorouter(JSON.stringify(router), IOSRouterss)
	}


	/**
	 * 
	 * @param router跳转直播列表 
	 */
	static gotoLiveListPage() {
		NativeJs.baseGoRouter('ihayner://livelist_activity:10061?', "")
	}


	/**
	 * 
	 * @param 跳转banner页 
	 */
	static gotoBanner(bannerdata: { _id, create_time, image_url, device_image_url, intro, link_url, order, target, title, link_type, ref_type }) {
		baseNativeJs('banner', { bannerdata })
	}

	/**
	 * 跳转首页
	 */
	static gotoHome() {
		NativeJs.baseGoRouter('ihayner://homepage:10002?', "")
	}

	/**
	 * 跳转交易
	 */
	static tradeStock(stock_name: string, stock_code: string, buyorsell: 'buy' | 'sell') {
		baseNativeJs('tradeStock', { stock_name, stock_code, buyorsell })
	}

	/**
	 * 点击放大图片
	 */
	static imageClick(img_url) {

		baseNativeJs("imgClick", { img_url })
	}

	/**
	 * 字体缩放
	 */
	static changeBodyFontSize(isshow, callback) {
		window['changeBodyFontSize'] = function (result: any) {
			try {
				result = result;
			} catch (e) {
				console.log('出错！');
			}
			if (result) {
				callback(result);
				// window['userInfo'].access_token=result;
			}
		}
		baseNativeJs("changeBodyFontSize", { isshow })
	}


    /**
     * 自选股添加和删除
     * @param stock_method 添加还是删除", （boolean值 默认false 删除）
     * @param stock_code 股票代码
     */
	static optional(stock_method: boolean, stock_code: string) {
		baseNativeJs("optional", { stock_method, stock_code })
	}

	/**
	 * 获取埋点头
	 */
	static getRequestHead(callback) {
		window['getRequestHead'] = function (result: any) {
			delete window['getRequestHead'];
			try {
				result = result;
			} catch (e) {
				console.log('出错！');
			}
			if (result) {
				callback(result);
			}
		}
		return baseNativeJs("getRequestHead")
	}

	/**
	 * 拨打电话
	 */
	static callphone(title: string, phone: string) {

		return baseNativeJs("callphone", { title, phone })
	}

	//返回上一级
	static goBack() {
		return baseNativeJs("backtofinish")
	}

	//ios改变状态栏颜色
	static statusBarStyle(style) {
		if (Utils.isIOS()) {
			return baseNativeJs("statusBarStyle", { style })
		}
	}

	static gotoapp() {
		if (!Utils.isApp()){
			window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.sz.nniu'
		}
	}
}
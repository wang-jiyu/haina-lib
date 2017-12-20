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
const baseNativeJs = (funcName: string, params?: object, ios?: object) => {
	if (typeof window['webkit'] != 'undefined') {
		const realParam = ios ? Object.assign({}, {
			"nativeCallJS": funcName
		}, { ...ios }) : Object.assign({}, {
			"nativeCallJS": funcName
		}, { ...params })
		window['webkit'].messageHandlers.jsCallNative.postMessage(realParam);
	} else if (/Android/i.test(window.navigator.userAgent)) {
		const realParam = Object.assign({}, {
			"nativecalljs": funcName
		}, { ...params })				       //android
		const paramstr = JSON.stringify(realParam)
		window['haina'].pushEvent(paramstr);
	}
}
import { IShareValue } from './NativeInterface'
class NativeJs {

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
		NativeJs.baseWindow("topay")
		return baseNativeJs("topay", { id: ref_id, type: ref_type, ...buyCycle }, { ref_id, ref_type, ...buyCycle });
	}

	/**
	 * 应用内部跳转
	 * @param router 
	 */
	static gorouter(router: string, iosRouter: string): any {
		NativeJs.baseWindow("gorouter")
		return baseNativeJs('gorouter', { router }, { router: iosRouter })
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
	static shareWeiXin(shareValue: IShareValue) {
		NativeJs.baseWindow("shareWeiXin")
		baseNativeJs('shareWeiXin', { shareValue })
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
	static shareFriends(shareValue: IShareValue) {
		NativeJs.baseWindow("shareFriends")
		baseNativeJs('shareFriends', { shareValue })
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
	static share(shareValue: IShareValue) {
		NativeJs.baseWindow("share")
		baseNativeJs('share', { shareValue })
	}


    /**
     * 
     * @param product_id 适当性检测
     * @param risk_score 
     */

	static ihanerFSP(product_id: string, risk_score: string) {
		NativeJs.baseWindow("ihanerFSP")
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
	static gotoLiveListPage(router: string) {
		NativeJs.baseGoRouter('ihayner://livelist_activity:10061?', "")
	}
}
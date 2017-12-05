
export const baseNativeJs = (funcName: string, params?: object, ios?: object) => {
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
import {IShareValue} from './NativeInterface'
export default class NativeJs {

	/**
	 * 登陆
	 * 返回token
	 * @param callback 
	 */
	static login(callback: Function): any {
		window['refreshtoken'] = function (result) {
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
	static gorouter(router:string): any {
		
		return baseNativeJs('gorouter',{router})
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
	static shareWeiXin(shareValue:IShareValue){
		baseNativeJs('shareWeiXin',shareValue)
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
	static shareFriends(shareValue:IShareValue){
		baseNativeJs('shareFriends',shareValue)
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
	static share(shareValue:IShareValue){
		baseNativeJs('shareFriends',shareValue)
	}
}
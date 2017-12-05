
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
export default class NativeJs {

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

	static gorouter(router:string): any {
		
		return baseNativeJs('gorouter',{router})
	}

	

}
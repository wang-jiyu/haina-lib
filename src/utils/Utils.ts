





export default class Utils {
    static UUID(): string {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }

    static getQuertString(key: string): string {
        let reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
        let r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]);
        return null;
    }

    static isApp() {
        var ua = window.navigator.userAgent.toLowerCase();
        return ua.indexOf('hayner') > 1
    }

    static isIOS() {
        return window.navigator.appVersion.match(/iphone|iPad|iPod|iOS/gi)
    }

    static isAndroid() {
        return window.navigator.appVersion.match(/android/gi)
    }

    static isPhone(phone: string) {
        return /^1[3|4|5|8][0-9]\d{8}$/.test(phone.replace(/\s+/g, ""))
    }

    static getRealByFontSize(value: number): number {
        let base = value / 100
        let fontSize = Number.parseFloat(document.documentElement.style.fontSize)

        return base * fontSize
    }

    static setDocumentTitle(title: string) {
        document.title = title
        if (Utils.isIOS()) {
            const iframe = document.createElement('iframe');
            iframe.style.cssText = 'display: none; width: 0; height: 0;';
            iframe.src = 'https://m2.0606.com.cn/assets/images/logo.png';
            const listener = () => {
                setTimeout(() => {
                    iframe.removeEventListener('load', listener);
                    setTimeout(() => {
                        document.body.removeChild(iframe);
                    }, 0);
                }, 0);
            };
            iframe.addEventListener('load', listener);
            document.body.appendChild(iframe);
        }
    }

    static loadOutJS(jsurl:string,async:boolean=false) {
        let script = document.createElement("script")
        script.type = 'text/javascript'
        script.src = jsurl
        script.async = async
        document.body.appendChild(script)
    }

}
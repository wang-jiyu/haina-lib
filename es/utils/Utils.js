export default class Utils {
    static UUID() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }
    static getQuertString(key) {
        let reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
        let r = window.location.search.substr(1).match(reg);
        if (r != null)
            return decodeURI(r[2]);
        return null;
    }
    static isApp() {
        var ua = window.navigator.userAgent.toLowerCase();
        return ua.indexOf('hayner') > 1;
    }
    static isIOS() {
        return window.navigator.appVersion.match(/iphone|iPad|iPod|iOS/gi);
    }
    static isAndroid() {
        return window.navigator.appVersion.match(/android/gi);
    }
    static isPhone(phone) {
        return Utils.phoneRegex[window.navigator.language.toLowerCase()].test(phone.replace(/\s+/g, ""));
    }
    static getRealByFontSize(value) {
        let baseFontSize = window['baseFontSize_haina'];
        let fontSize = Number.parseFloat(document.documentElement.style.fontSize);
        return value * (fontSize / baseFontSize);
    }
    static setDocumentTitle(title) {
        document.title = title;
        if (Utils.isIOS() && !Utils.isApp()) {
            console.log('ios_in');
            const iframe = document.createElement('iframe');
            iframe.style.cssText = 'display: none; width: 0; height: 0;';
            iframe.src = 'about:blank';
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
    static loadOutJS(jsurl, async = false) {
        let script = document.createElement("script");
        script.type = 'text/javascript';
        script.src = jsurl;
        script.async = async;
        document.body.appendChild(script);
    }
    static isWx() {
        const ua = window.navigator.userAgent.toLowerCase();
        if (ua.indexOf('micromessenger') < 0) {
            return false;
        }
        else {
            return true;
        }
    }
    static isQQ() {
        const ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/QQ/ig)) {
            return true;
        }
        return false;
    }
}
Utils.phoneRegex = {
    'ar-dz': /^(\+?213|0)(5|6|7)\d{8}$/,
    'ar-sy': /^(!?(\+?963)|0)?9\d{8}$/,
    'ar-sa': /^(!?(\+?966)|0)?5\d{8}$/,
    'en-us': /^(\+?1)?[2-9]\d{2}[2-9](?!11)\d{6}$/,
    'cs-cz': /^(\+?420)? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$/,
    'de-de': /^(\+?49[ \.\-])?([\(]{1}[0-9]{1,6}[\)])?([0-9 \.\-\/]{3,20})((x|ext|extension)[ ]?[0-9]{1,4})?$/,
    'da-dk': /^(\+?45)?(\d{8})$/,
    'el-gr': /^(\+?30)?(69\d{8})$/,
    'en-au': /^(\+?61|0)4\d{8}$/,
    'en-gb': /^(\+?44|0)7\d{9}$/,
    'en-hk': /^(\+?852\-?)?[569]\d{3}\-?\d{4}$/,
    'en-in': /^(\+?91|0)?[789]\d{9}$/,
    'en-nz': /^(\+?64|0)2\d{7,9}$/,
    'en-za': /^(\+?27|0)\d{9}$/,
    'en-zm': /^(\+?26)?09[567]\d{7}$/,
    'es-es': /^(\+?34)?(6\d{1}|7[1234])\d{7}$/,
    'fi-fi': /^(\+?358|0)\s?(4(0|1|2|4|5)?|50)\s?(\d\s?){4,8}\d$/,
    'fr-fr': /^(\+?33|0)[67]\d{8}$/,
    'he-il': /^(\+972|0)([23489]|5[0248]|77)[1-9]\d{6}/,
    'hu-hu': /^(\+?36)(20|30|70)\d{7}$/,
    'it-it': /^(\+?39)?\s?3\d{2} ?\d{6,7}$/,
    'ja-jp': /^(\+?81|0)\d{1,4}[ \-]?\d{1,4}[ \-]?\d{4}$/,
    'ms-my': /^(\+?6?01){1}(([145]{1}(\-|\s)?\d{7,8})|([236789]{1}(\s|\-)?\d{7}))$/,
    'nb-no': /^(\+?47)?[49]\d{7}$/,
    'nl-be': /^(\+?32|0)4?\d{8}$/,
    'nn-no': /^(\+?47)?[49]\d{7}$/,
    'pl-pl': /^(\+?48)? ?[5-8]\d ?\d{3} ?\d{2} ?\d{2}$/,
    'pt-br': /^(\+?55|0)\-?[1-9]{2}\-?[2-9]{1}\d{3,4}\-?\d{4}$/,
    'pt-pt': /^(\+?351)?9[1236]\d{7}$/,
    'ru-ru': /^(\+?7|8)?9\d{9}$/,
    'sr-rs': /^(\+3816|06)[- \d]{5,9}$/,
    'tr-tr': /^(\+?90|0)?5\d{9}$/,
    'vi-vn': /^(\+?84|0)?((1(2([0-9])|6([2-9])|88|99))|(9((?!5)[0-9])))([0-9]{7})$/,
    'zh-cn': /^(\+?0?86\-?)?1[345789]\d{9}$/,
    'zh-tw': /^(\+?886\-?|0)?9\d{8}$/
};

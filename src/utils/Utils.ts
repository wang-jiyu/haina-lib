





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
        let qs = window.location.search.substr(1), // 获取url中"?"符后的字串   
            items = qs.length ? qs.split("&") : [] // 取得每一个参数项,
        const item = items.filter(item => {
            return item.split("=")[0] === key
        })

        return item[key];
    }

}
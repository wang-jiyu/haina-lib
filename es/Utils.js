define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UUID = () => {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    };
    exports.getQuertString = (key) => {
        let qs = location.search.substr(1), items = qs.length ? qs.split("&") : [];
        const item = items.filter(item => {
            return item.split("=")[0] === key;
        });
        return item[key];
    };
});

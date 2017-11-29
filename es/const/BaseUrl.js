define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        advisor: {
            production: 'https://advisor2.0606.com.cn/api',
            testing: 'https://advisor-test.0606.com.cn/api',
            development: '/dev/api'
        },
        mapi: {
            production: 'https://mapi.0606.com.cn/api',
            testing: 'https://mapi-test.0606.com.cn/api',
            development: 'https://mapi-test.0606.com.cn/api'
        },
        bigfund: {
            production: 'http://bigfund.0606.com.cn',
            testing: 'http://bigfund-test.0606.com.cn',
            development: 'http://bigfund-dev1.0606.com.cn'
        }
    };
});

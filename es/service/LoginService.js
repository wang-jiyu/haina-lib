define(["require", "exports", "../Request", "../const/index", "../model/index", "../Utils"], function (require, exports, Request_1, index_1, index_2, Utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.login = (url, params) => {
        const loginStr = localStorage.getItem("LoginModel");
        if (loginStr && loginStr.length > 4) {
            return Promise.resolve(JSON.parse(loginStr));
        }
        let client_id = localStorage.getItem("client_id");
        if (client_id && client_id.length > 16) {
            index_2.LoginModel.client_id = client_id;
        }
        else {
            client_id = Utils_1.UUID();
            index_2.LoginModel.client_id = client_id;
            localStorage.setItem("client_id", client_id);
        }
        return new Promise((resolve, reject) => {
            Request_1.default.mapi.get(`/v2/security/authorize?response_type=base&client_id=${client_id}`).then(data => {
                console.log(data);
                const { auth_code } = data;
                return auth_code;
            }).then(auth_code => {
                Object.assign(params, {
                    passwd: '49ba59abbe56e057',
                    auth_code,
                    push_msg: index_2.LoginModel.push_msg
                });
                Request_1.default.mapi.post(`/v2/user/login?client_id=${client_id}&source=${index_2.LoginModel.source}&version=${index_1.version}`, params).then(data => {
                    const { token_info, user_info, coupon_info } = data;
                    index_2.LoginModel.access_token = token_info.access_token;
                    index_2.LoginModel.refresh_token = token_info.refresh_token;
                    localStorage.setItem("LoginModel", JSON.stringify(index_2.LoginModel));
                    resolve(index_2.LoginModel);
                }).catch(err => {
                    console.log(err);
                    reject(err);
                });
            }).catch(err => {
                reject(err);
            });
        });
    };
    exports.refreshToken = () => {
        const { refresh_token, source, client_id, push_msg } = index_2.LoginModel;
        return Request_1.default.mapi.post(`/v2/user/reftoken?refresh_token=${refresh_token}&source=${source}&client_id=${client_id}`, {
            push_msg
        }).then(data => {
            index_2.LoginModel.access_token = data.access_token;
            return {
                code: 200
            };
        }).catch(err => {
            return err;
        });
    };
});

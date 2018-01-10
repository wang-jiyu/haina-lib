import axios from 'axios';
export default class HttpClient {
    static get(domainName, url, config) {
        return new Promise((resolve, reject) => {
            axios.get(`${domainName}${url}`, config).then(res => {
                if (res.data.code === 200) {
                    resolve(res.data.data);
                }
                else {
                    reject(res.data);
                }
            }).catch(err => {
                reject(err);
            });
        });
    }
    static post(domainName, url, data, config) {
        return new Promise((resolve, reject) => {
            axios.post(`${domainName}${url}`, data, config).then(res => {
                if (res.data.code === 200) {
                    resolve(res.data.data);
                }
                else {
                    reject(res.data);
                }
            }).catch(err => {
                reject(err);
            });
        });
    }
    static put(domainName, url, data, config) {
        return new Promise((resolve, reject) => {
            axios.put(`${domainName}${url}`, data, config).then(res => {
                if (res.data.code === 200) {
                    resolve(res.data.data);
                }
                else {
                    reject(res.data);
                }
            }).catch(err => {
                reject(err);
            });
        });
    }
    static delete(domainName, url, config) {
        return new Promise((resolve, reject) => {
            axios.delete(`${domainName}${url}`, config).then(res => {
                if (res.data.code === 200) {
                    resolve(res.data.data);
                }
                else {
                    reject(res.data);
                }
            }).catch(err => {
                reject(err);
            });
        });
    }
}

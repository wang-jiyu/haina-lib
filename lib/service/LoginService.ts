


import Request from '../Request'
import {version} from '../const'
import {LoginModel} from '../model'


export const loginService = (url:string,params:object) => {
    const client_id = ''
    return new Promise(function(resolve, reject) {
        Request.mapi.post(`${url}?client_id=${client_id}&source=web&version=${version}`,params).then(res=>{
            const {data}  = res
            if(data.code===200){
                const {token_info,user_info,coupon_info} = data.data
                LoginModel.access_token = token_info.access_token
                resolve(data.data)
            }else {
                reject(data.data)
            }
        }).catch(err=>{
            reject(err)
        })
    })

}
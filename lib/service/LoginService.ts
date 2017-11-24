


import Request from '../Request'
import { version } from '../const'
import { LoginModel } from '../model'
import md5 from 'blueimp-md5/js/md5.min.js'
import {UUID} from  '../Utils'


export const login = (url: string, params: { user_id: string, passwd: string }):Promise<any> => {
    
    let client_id = localStorage.getItem("client_id")
    if(client_id){
        LoginModel.client_id
    }else {
        LoginModel.client_id = UUID()
        localStorage.setItem("client_id",client_id)
    }
    return Request.mapi.get(`/v2/security/authorize?response_type=base&client_id=${LoginModel.client_id}`).then(data => {
        const { auth_code } = data
        return auth_code
    }).then(auth_code=>{
        Object.assign(params, {
            passwd: md5(params.passwd),
            auth_code,
            push_msg: LoginModel.push_msg
        })
        Request.mapi.post(`/v2/user/login?client_id=${LoginModel.client_id}&source=${LoginModel.source}&version=${version}`, params).then(data => {
            const { token_info, user_info, coupon_info } = data
            LoginModel.access_token = token_info.access_token
            LoginModel.refresh_token = token_info.refresh_token
            return data
        }).catch(err=>{
            //处理
            return err
        })
    }).catch(err=>{
        //处理
        return err
    })

}

export const refreshToken = ():Promise<any> => {
    const {refresh_token,source,client_id,push_msg} = LoginModel
    return Request.mapi.post(`/v2/user/reftoken?refresh_token=${refresh_token}&source=${source}&client_id=${client_id}`,{
        push_msg
    }).then(data=>{
        LoginModel.access_token = data.access_token
        return {
            code:200
        }
    }).catch(err=>{
        //处理
        return err
    })
}
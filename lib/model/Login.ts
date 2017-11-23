
import {observable} from 'mobx'

export default class LoginModel {


    @observable
    public mobile:number

    // @observable
    // public passwd:string

    // @observable
    // public sms_code:string

    public client_id:string


    public push_msg:string = 'h5登陆'

    public source:string = 'web'

    public version:string = 'v2.0'

    public access_token:string

}


export function getLoginInstance() {
    return new LoginModel()
} 

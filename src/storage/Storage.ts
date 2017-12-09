export default class Storage {


    static get(key:string,json?:boolean):any{
        let result = window.localStorage.getItem(key)
        if(json){
            result = JSON.parse(result)
        }
        return result
    }

    static set(key:string,value:any,isjson?:boolean){
        
        return window.localStorage.setItem(key,JSON.stringify(value))
    }

    static remove(key:string){
        return window.localStorage.removeItem(key)
    }

    static clear(){
        return window.localStorage.clear()
    }
}
export default class Storage {


    static get(key: string, json?: boolean): any {
        try {
            let result = window.localStorage.getItem(key)
            if (json) {
                result = JSON.parse(result)
            }
            return result
        } catch (err) {
            alert('不支持本地缓存')
        }
    }

    static set(key: string, value: any, isjson?: boolean) {


        try {
            return window.localStorage.setItem(key, isjson ? value : JSON.stringify(value))
        } catch (err) {
            alert('不支持本地缓存')
        }
    }

    static remove(key: string) {

        try {
            return window.localStorage.removeItem(key)
        } catch (err) {
            alert('不支持本地缓存')
        }
    }

    static clear() {

        try {
            return window.localStorage.clear()
        } catch (err) {
            alert('不支持本地缓存')
        }
    }
}

// Fake localStorage implementation. 
// Mimics localStorage, including events. 
// It will work just like localStorage, except for the persistant storage part. 


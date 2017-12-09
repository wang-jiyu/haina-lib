import * as pako from 'pako'
export default class StringUtils {


    static base64ZipToUtf8Array(res: string):Uint8Array {
        let strData = window.atob(res);
        let charData = strData.toString().split('').map(function (x) { return x.charCodeAt(0); });

        let binData = new Uint8Array(charData);

        let data = pako.inflate(binData);
        return data
    }
    static Utf8ArrayToStr(array: Uint8Array): string {
        let out, i, len, c;
        let char2, char3;

        out = "";
        len = array.length;
        i = 0;
        while (i < len) {
            c = array[i++];
            switch (c >> 4) {
                case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
                    // 0xxxxxxx
                    out += String.fromCharCode(c);
                    break;
                case 12: case 13:
                    // 110x xxxx   10xx xxxx
                    char2 = array[i++];
                    out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
                    break;
                case 14:
                    // 1110 xxxx  10xx xxxx  10xx xxxx
                    char2 = array[i++];
                    char3 = array[i++];
                    out += String.fromCharCode(((c & 0x0F) << 12) |
                        ((char2 & 0x3F) << 6) |
                        ((char3 & 0x3F) << 0));
                    break;
            }
        }
        return out
    }

    static largeUint8ArrToString(uint8arr: Uint8Array):Promise<any> {
        return new Promise((resolve, reject) => {
            let bb = new Blob([uint8arr]);
            let f = new FileReader();
            f.onload = function (e) {
                const target = e.target as any
                resolve(target.result)
            }
            f.onerror = function (error) {
                reject(error)
            }
            f.readAsText(bb);
        })

    }
}
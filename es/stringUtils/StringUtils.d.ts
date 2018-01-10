export default class StringUtils {
    static base64ZipToUtf8Array(res: string): Uint8Array;
    static Utf8ArrayToStr(array: Uint8Array): string;
    static largeUint8ArrToString(uint8arr: Uint8Array): Promise<any>;
}

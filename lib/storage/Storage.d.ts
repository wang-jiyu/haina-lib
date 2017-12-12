export default class Storage {
    static get(key: string, json?: boolean): any;
    static set(key: string, value: any, isjson?: boolean): void;
    static remove(key: string): void;
    static clear(): void;
}

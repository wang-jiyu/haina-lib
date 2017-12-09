export default class Storage {
    static get(key: string, json?: boolean): string;
    static set(key: string, value: any): void;
    static remove(key: string): void;
    static clear(): void;
}

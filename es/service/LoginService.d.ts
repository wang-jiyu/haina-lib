export declare const login: (url: string, params: {
    user_id: string;
    passwd: string;
}) => Promise<any>;
export declare const refreshToken: () => Promise<any>;

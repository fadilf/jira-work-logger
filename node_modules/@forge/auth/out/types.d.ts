export declare type PermissionCheck = (args?: any) => Promise<boolean | object>;
export declare type PermissionCheckAPI = Record<string, PermissionCheck | ((args?: any) => PermissionCheckAPI)>;
export interface RequestOptions {
    method: string;
    body: string;
}
export declare type RequestFunction<T = any> = (path: string, options: RequestOptions) => Promise<T>;
export interface FetchHelper {
    requestJira: RequestFunction;
    requestConfluence: RequestFunction;
}
export declare type AuthorizeWithFetchHelper = (fetchHelper: FetchHelper, accountId: string) => PermissionCheckAPI;
//# sourceMappingURL=types.d.ts.map
export declare type Route = {
    readonly value: string;
};
export declare function isRoute(x: unknown): x is Route;
export declare function route(path: TemplateStringsArray, ...parameters: (string | number | URLSearchParams | Route)[]): Route;
export declare function requireSafeUrl(url: unknown): Route;
export declare function assumeTrustedRoute(route: string): Route;
//# sourceMappingURL=safeUrl.d.ts.map
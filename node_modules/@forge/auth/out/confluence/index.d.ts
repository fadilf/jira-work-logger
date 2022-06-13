import { FetchHelper } from '../types';
declare type RequestConfluence = FetchHelper['requestConfluence'];
declare type ContentId = string | number;
export declare const authorizeConfluenceWithFetch: (requestConfluence: RequestConfluence, accountId: string) => {
    readonly onConfluenceContent: (contentId: ContentId) => Record<string, import("../types").PermissionCheck>;
};
export {};
//# sourceMappingURL=index.d.ts.map
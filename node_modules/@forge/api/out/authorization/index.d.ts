export declare const authorize: () => {
    readonly onJira: (projectPermissionsInput: import("@forge/auth/out/jira").ProjectPermission[]) => Promise<import("@forge/auth/out/jira").ProjectPermissionResponse[]>;
    readonly onJiraProject: (projects: string | number | (string | number)[]) => Record<string, import("@forge/auth/out/types").PermissionCheck>;
    readonly onJiraIssue: (issues: string | number | (string | number)[]) => Record<string, import("@forge/auth/out/types").PermissionCheck>;
    readonly onConfluenceContent: (contentId: string | number) => Record<string, import("@forge/auth/out/types").PermissionCheck>;
};
//# sourceMappingURL=index.d.ts.map
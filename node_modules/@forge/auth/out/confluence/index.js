"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeConfluenceWithFetch = void 0;
const tslib_1 = require("tslib");
const api_1 = require("../api");
const permissions_1 = tslib_1.__importDefault(require("./permissions"));
const checkConfluencePermissions = async (requestConfluence, accountId, contentId, permission) => {
    const res = await requestConfluence(`/rest/api/content/${contentId}/permission/check`, {
        method: 'post',
        body: JSON.stringify({
            subject: {
                type: 'user',
                identifier: accountId
            },
            operation: permission
        })
    });
    return res;
};
const getPermissionsCheckFactory = (requestConfluence, accountId, contentId) => (permission) => {
    return async () => {
        const res = await checkConfluencePermissions(requestConfluence, accountId, contentId, permission);
        return Boolean(res === null || res === void 0 ? void 0 : res.hasPermission);
    };
};
exports.authorizeConfluenceWithFetch = (requestConfluence, accountId) => {
    return {
        onConfluenceContent: (contentId) => api_1.createApiMethods(permissions_1.default, getPermissionsCheckFactory(requestConfluence, accountId, contentId))
    };
};

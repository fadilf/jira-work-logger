"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
const auth_1 = require("@forge/auth");
const api = global.api;
exports.authorize = () => {
    if (!process.env.__CURRENT_USER_ACCOUNT_ID)
        throw new Error(`Couldn’t find the accountId of the invoking user. This API can only be used inside user-invoked modules.`);
    const accountId = process.env.__CURRENT_USER_ACCOUNT_ID;
    return Object.assign(Object.assign({}, auth_1.authorizeConfluenceWithFetch(async (path, opts) => {
        const res = await api.asUser().requestConfluence(path, opts);
        return res.json();
    }, accountId)), auth_1.authorizeJiraWithFetch(async (path, opts) => {
        const res = await api.asUser().requestJira(path, opts);
        return res.json();
    }, accountId));
};

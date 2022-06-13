"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.webTrigger = exports.properties = exports.storage = exports.store = exports.requestConfluence = exports.requestJira = exports.fetch = exports.authorize = exports.asApp = exports.asUser = exports.privacy = void 0;
const storage_1 = require("@forge/storage");
const api_1 = require("./api");
const authorization_1 = require("./authorization");
Object.defineProperty(exports, "authorize", { enumerable: true, get: function () { return authorization_1.authorize; } });
const properties_1 = require("./properties");
const privacy_1 = require("./privacy");
const webTrigger_1 = require("./webTrigger");
Object.defineProperty(exports, "webTrigger", { enumerable: true, get: function () { return webTrigger_1.webTrigger; } });
function withDeprecatedMessage(method, message) {
    const wrappedMethod = (...args) => {
        console.warn(message);
        return method(...args);
    };
    return wrappedMethod;
}
const FetchAPI = api_1.wrapFetchApiMethods(global.api, api_1.transformResponse);
const asUser = FetchAPI.asUser;
exports.asUser = asUser;
const asApp = FetchAPI.asApp;
exports.asApp = asApp;
const fetch = FetchAPI.fetch;
exports.fetch = fetch;
const requestJira = FetchAPI.requestJira;
exports.requestJira = requestJira;
const requestConfluence = FetchAPI.requestConfluence;
exports.requestConfluence = requestConfluence;
const deprecatedPropertiesApi = Object.entries(properties_1.propertiesApi)
    .map(([name, method]) => {
    const wrappedMethod = withDeprecatedMessage(method, `store.${name}() is deprecated. Use properties.${name}() imported from '@forge/api' instead`);
    return {
        [name]: wrappedMethod
    };
})
    .reduce((acc, next) => Object.assign(acc, next), {});
const store = deprecatedPropertiesApi;
exports.store = store;
const storage = storage_1.getStorageInstanceWithQuery(new storage_1.GlobalStorage(global.api.__getAppAri, global.api.asApp().__requestAtlassian));
exports.storage = storage;
const properties = properties_1.propertiesApi;
exports.properties = properties;
const API = Object.assign(Object.assign({}, FetchAPI), { store: Object.assign({}, store) });
exports.privacy = {
    reportPersonalData: privacy_1.createReportPersonalData(global.api.asApp().__requestAtlassian)
};
exports.default = API;
var storage_2 = require("@forge/storage");
Object.defineProperty(exports, "startsWith", { enumerable: true, get: function () { return storage_2.startsWith; } });
var safeUrl_1 = require("./safeUrl");
Object.defineProperty(exports, "route", { enumerable: true, get: function () { return safeUrl_1.route; } });
Object.defineProperty(exports, "assumeTrustedRoute", { enumerable: true, get: function () { return safeUrl_1.assumeTrustedRoute; } });

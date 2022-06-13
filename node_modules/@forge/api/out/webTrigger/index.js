"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.webTrigger = void 0;
exports.webTrigger = {
    getUrl: async (webTriggerModuleKey) => {
        return global.api.webTrigger.getUrl(webTriggerModuleKey);
    }
};

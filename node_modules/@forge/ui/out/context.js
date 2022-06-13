"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toProductContext = void 0;
const DEFAULT_RUNTIME_CONTEXT = {};
exports.toProductContext = (context, runtimeContext) => {
    const { principal, installContext, license } = runtimeContext || DEFAULT_RUNTIME_CONTEXT;
    const { cloudId, contentId, localId, spaceKey, isConfig, platformContext, extensionContext, moduleKey } = context;
    return {
        accountId: principal && principal.accountId,
        cloudId,
        contentId,
        localId,
        spaceKey,
        installContext,
        platformContext,
        isConfig,
        extensionContext,
        license,
        moduleKey
    };
};

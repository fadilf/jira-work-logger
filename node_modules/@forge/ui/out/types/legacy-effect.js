"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLegacyBackendEffect = exports.isLegacyRenderEffect = exports.isLegacyEventEffect = exports.isLegacyActionEffect = exports.isLegacyInitializeEffect = void 0;
exports.isLegacyInitializeEffect = (effect) => {
    return effect.type === 'initialize';
};
exports.isLegacyActionEffect = (effect) => {
    return effect.type === 'action';
};
exports.isLegacyEventEffect = (effect) => {
    return effect.type === 'event';
};
exports.isLegacyRenderEffect = (effect) => {
    return effect.type === 'render';
};
function isLegacyBackendEffect(effect) {
    return (exports.isLegacyInitializeEffect(effect) ||
        exports.isLegacyActionEffect(effect) ||
        exports.isLegacyEventEffect(effect));
}
exports.isLegacyBackendEffect = isLegacyBackendEffect;

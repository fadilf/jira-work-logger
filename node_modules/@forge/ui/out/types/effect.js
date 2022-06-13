"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBackendEffect = exports.isResultEffect = exports.isRenderEffect = exports.isActionEffect = exports.isEventEffect = void 0;
exports.isEventEffect = (effect) => {
    return effect.type === 'event';
};
exports.isActionEffect = (effect) => {
    return effect.type === 'action';
};
exports.isRenderEffect = (effect) => {
    return effect.type === 'render';
};
exports.isResultEffect = (effect) => {
    return effect.type === 'result';
};
function isBackendEffect(effect) {
    return (exports.isActionEffect(effect) || exports.isEventEffect(effect) || exports.isRenderEffect(effect));
}
exports.isBackendEffect = isBackendEffect;

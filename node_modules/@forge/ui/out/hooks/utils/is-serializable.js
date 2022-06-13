"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSerializable = void 0;
const PERMITTED_PRIMITIVE_DEPENDENCIES_TYPES = ['string', 'number', 'boolean'];
exports.isSerializable = (value) => {
    if (value === null || value === undefined) {
        return true;
    }
    if (typeof value === 'object') {
        return !Object.keys(value).some((key) => !exports.isSerializable(value[key]));
    }
    if (PERMITTED_PRIMITIVE_DEPENDENCIES_TYPES.includes(typeof value)) {
        return true;
    }
    return false;
};

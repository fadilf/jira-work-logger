"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizedKey = void 0;
exports.sanitizedKey = (input) => {
    const regex = /^(~)?[A-Za-z0-9_\-]+$/;
    if (!regex.test(input)) {
        throw new Error('Invalid context/property key');
    }
    return input;
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashDependencies = void 0;
const tslib_1 = require("tslib");
const fast_json_stable_stringify_1 = tslib_1.__importDefault(require("fast-json-stable-stringify"));
const sha_js_1 = tslib_1.__importDefault(require("sha.js"));
exports.hashDependencies = (values) => sha_js_1.default('sha256')
    .update(fast_json_stable_stringify_1.default(values))
    .digest('hex');

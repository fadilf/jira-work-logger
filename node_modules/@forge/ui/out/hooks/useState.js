"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useState = void 0;
const useAction_1 = require("./useAction");
exports.useState = (initialValue) => {
    return useAction_1.useAction((_, payload) => payload, initialValue);
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const context_1 = require("../context");
describe('context', () => {
    describe('toProductContext', () => {
        it('should add the license to product context', () => {
            expect(context_1.toProductContext({}, {
                license: {
                    isActive: true
                }
            })).toHaveProperty('license', {
                isActive: true
            });
        });
    });
});

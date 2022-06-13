"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../hooks/utils");
describe('hashDependencies', () => {
    test('should correct hash dependencies empty array', () => {
        expect(() => utils_1.hashDependencies([])).not.toThrowError();
    });
    test('should correct hash dependencies for values of various types', () => {
        const value = [
            true,
            'some dependency',
            10000,
            {
                name: 'mmichalczuk',
                country: 'poland',
                team: 'smite',
                teamUrl: 'https://hello.atlassian.net/wiki/spaces/SMITE/overview'
            }
        ];
        expect(() => utils_1.hashDependencies(value)).not.toThrowError();
    });
    test('should create same hashes for objects with keys in different order', () => {
        const firstDependencies = [
            {
                name: 'mmichalczuk',
                team: 'smite'
            }
        ];
        const secondDependencies = [
            {
                team: 'smite',
                name: 'mmichalczuk'
            }
        ];
        expect(utils_1.hashDependencies(firstDependencies)).toBe(utils_1.hashDependencies(secondDependencies));
    });
    test('should create same hashes for objects with keys in different order, inside nested objects', () => {
        const firstDependencies = [
            {
                change: 'some value',
                author: {
                    name: 'mmichalczuk',
                    team: 'smite'
                }
            }
        ];
        const secondDependencies = [
            {
                change: 'some value',
                author: {
                    team: 'smite',
                    name: 'mmichalczuk'
                }
            }
        ];
        expect(utils_1.hashDependencies(firstDependencies)).toBe(utils_1.hashDependencies(secondDependencies));
    });
});

import { describe, expect, test } from 'vitest';
import { asTitleCase } from './functions'

describe("Utility Functions", () => {

    test('asTitleCase should make first word title case', () => {
        const string = "random string";
        const expected = "Random string";
        expect(asTitleCase(string)).toBe(expected);    
    })

});

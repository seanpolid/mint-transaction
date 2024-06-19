import { beforeEach, describe, expect, test } from "vitest";

import { findParent, asTitleCase, isBlank, compareString, extractCurrency } from "./functions";

describe('findParent', () => {
    
    let start = document.createElement('div');
    const container = document.createElement('main');

    beforeEach(() => {
        start = document.createElement('div');

        const section = document.createElement('section');
        section.appendChild(start);

        container.appendChild(section);
    })

    test('should return null', () => {
        // Arrange
        const start = document.createElement('div');

        // Act
        const parent = findParent(start, {nodeName: 'main'});

        // Assert
        expect(parent).toBeNull();
    }) 

    test('should return html element with correct node name', () => {
        // Act
        const parent = findParent(start, {nodeName: 'main'});

        // Assert
        expect(parent).not.toBeNull();
        expect(parent?.nodeName).toBe('MAIN');
    })

    test('should return html element with correct id', () => {
        // Arrange
        const id = 'target';
        container.id = id;

        // Act
        const parent = findParent(start, {id: id});

        // Assert
        expect(parent).not.toBeNull();
        expect(parent?.id).toBe(id);
    })

    test('should return html element with correct className', () => {
        // Arrange
        const className = 'target';
        container.className = className;

        // Act
        const parent = findParent(start, {className: className});

        // Assert
        expect(parent).not.toBeNull();
        expect(parent?.className).toBe(className);
    }) 
})

describe("asTitleCase", () => {
	test("should make first word title case", () => {
		const string = "random string";
		const expected = "Random string";
		expect(asTitleCase(string)).toBe(expected);
	});
});

describe('extractCurrency', () => {
    test('should extract currency with decimal', () => {
        // Arrange
        const amount = '$10.25';
        const expected = '10.25';

        // Act
        const currency = extractCurrency(amount);

        // Assert
        expect(currency).toBe(expected);
    })

    test('should extract currency without decimal', () => {
        // Arrange
        const amount = '$10';
        const expected = '10';

        // Act
        const currency = extractCurrency(amount);

        // Assert
        expect(currency).toBe(expected);
    })

    test('should return null', () => {
        // Arrange
        const amount = '$a';
        
        // Act
        const currency = extractCurrency(amount);

        // Assert
        expect(currency).toBeNull();
    })

    test('should return only valid currency', () => {
        // Arrange
        const amount = '$10ab.1';
        const expected = '10';

        // Act
        const currency = extractCurrency(amount);

        // Assert
        expect(currency).toBe(expected);
    })
})

describe('isBlank', () => {
    test('should return true', () => {
        expect(isBlank(' ')).toBe(true);
    })

    test('should return false', () => {
        expect(isBlank(' a')).toBe(false);
    })
})

describe('compareString', () => {
    test('should return -1', () => {
        // Act
        const comparison = compareString('abc', 'ad');

        // Assert
        expect(comparison).toBe(-1);
    }) 

    test('should return 0', () => {
        // Act
        const comparison = compareString('abc', 'abc');

        // Assert
        expect(comparison).toBe(0);
    })

    test('should return 1', () => {
        // Act
        const comparison = compareString('ad', 'abc');

        // Assert
        expect(comparison).toBe(1);
    })
})
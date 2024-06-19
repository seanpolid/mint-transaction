type Options = {
	className?: string;
	id?: string;
	nodeName?: string;
	maxLimit?: number;
};

/**
 * Finds the parent dom element based on the provided options.
 * @param {*} element
 * @param {*} options
 * @returns
 */
export function findParent(element: HTMLElement, options: Options = {}) {
	const { className, id, nodeName, maxLimit = 10 } = options;
	if (!className && !id && !nodeName) {
		throw Error("Please provide a className or an id");
	}

	let hasAttribute;
	if (className) {
		hasAttribute = (elementToCheck: HTMLElement) =>
			elementToCheck.classList.contains(className);
	} else if (id) {
		hasAttribute = (elementToCheck: HTMLElement) => elementToCheck.id === id;
	} else {
		hasAttribute = (elementToCheck: HTMLElement) =>
			elementToCheck.nodeName.toLowerCase() === nodeName;
	}

	let current = 0;
	let currentElement: HTMLElement | null = element;
	while (
		currentElement &&
		!hasAttribute(currentElement) &&
		current < maxLimit
	) {
		const parentNode: ParentNode | null = currentElement.parentNode;
		currentElement = parentNode as HTMLElement | null;
		current++;
	}

	return currentElement ? currentElement : null;
}

/**
 * Makes the first word of a string title case.
 * @param {*} string
 * @returns
 */
export function asTitleCase(string: string): string {
	if (string[0] >= "a" && string[0] <= "z") {
		string = string[0].toUpperCase() + string.substring(1);
	}

	return string;
}

export function extractCurrency(string: string): string | null {
	const currencyPattern = /[0-9]+[.]*[0-9]{0,2}/;
	const match = string.match(currencyPattern);
	return match ? match[0] : null;
}

export function isBlank(string: string): boolean {
	if (string.length === 0) return true;

	const emptyPattern = /^[ ]*$/;
	return emptyPattern.test(string);
}

export const compareString = (string1: string, string2: string) => {
	string1 = string1.toLowerCase();
	string2 = string2.toLowerCase();

	if (string1 < string2) {
		return -1;
	} else if (string1 === string2) {
		return 0;
	} else {
		return 1;
	}
};

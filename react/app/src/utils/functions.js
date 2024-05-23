/**
 * Finds the parent dom element based on the provided options.
 * @param {*} element 
 * @param {*} options 
 * @returns 
 */
export function findParent(element, options = {}) {
    const { elementLimit, className, id, nodeName} = options;
    if (!className && !id && !nodeName) {
        throw Error('Please provide a className or an id');
    }

    let hasAttribute;
    if (className) {
        hasAttribute = (elementToCheck) => elementToCheck.classList.contains(className);
    } else if (id) {
        hasAttribute = (elementToCheck) => elementToCheck.id === id;
    } else {
        hasAttribute = (elementToCheck) => elementToCheck.nodeName.toLowerCase() === nodeName;
    }

    let currentElement = element;
    while (currentElement && !hasAttribute(currentElement) && (!elementLimit || currentElement !== elementLimit)) {
        currentElement = currentElement.parentNode;
    }

    return currentElement !== elementLimit ? currentElement : null;
};

/**
 * Makes the first word of a string title case.
 * @param {*} string 
 * @returns 
 */
export function asTitleCase(string) {
    if (string[0] >= 'a' && string[0] <= 'z') {
        string = string[0].toUpperCase() + string.substring(1);
    }
    
    return string;
}

export async function getData(uri) {
    try {
        const response = await fetch(uri);
        return await response.json();
    } catch (exception) {
        console.log("exception:", exception);
    }
}

export async function postData (uri, data) {
    try {
        const response = await fetch(uri, {
            method: 'POST', 
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

        return await response.json();
    } catch (exception) {
        console.log("exception:", exception);
        return [];
    }
}

export async function deleteData (uri) {
    try {
        const response = await fetch(uri, {method: 'DELETE'});
        if (response.status >= 200 && response.status < 300) {
            return true;
        } else {
            return false;
        }
    } catch (exception) {
        console.log("exception:", exception);
        return false;
    }
}

export async function putData (uri, data) {
    try {
        const response = await fetch(uri, {
            method: 'PUT',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (response.status >= 200 && response.status < 300) {
            return true;
        } else {
            return false;
        }
    } catch (exception) {
        console.log("exception:", exception);
        return false;
    }
}

export function extractCurrency(string) {
    const currencyPattern = /[0-9]+[.]*[0-9]{0,2}/;
    const match = string.match(currencyPattern);
    return match ? match[0] : null;
}

export function isBlank(string) {
    if (string.length === 0) return true;

    const emptyPattern = /^[ ]*$/;
    return emptyPattern.test(string);
}
/**
 * Finds the parent dom element based on the provided options.
 * @param {*} element 
 * @param {*} options 
 * @returns 
 */
const findParent = (element, options = {}) => {
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
const asTitleCase = (string) => {
    if (string[0] >= 'a' && string[0] <= 'z') {
        string = string[0].toUpperCase() + string.substring(1);
    }
    
    return string;
}

const getData = async (uri) => {
    try {
        const response = await fetch(uri);
        return await response.json();
    } catch (exception) {
        console.log("exception:", exception);
    }
}

const postData = async (uri, data) => {
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

const deleteData = async (uri) => {
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

const putData = async (uri, data) => {
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

export { findParent, asTitleCase, getData, postData, deleteData, putData}
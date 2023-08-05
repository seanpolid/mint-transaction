const findParent = (element, options = {}) => {
    const { elementLimit, className, id, type} = options;
    if (!className && !id && !type) {
        throw Error('Please provide a className or an id');
    }

    let hasAttribute;
    if (className) {
        hasAttribute = (elementToCheck) => elementToCheck.classList.contains(className);
    } else if (id) {
        hasAttribute = (elementToCheck) => elementToCheck.id === id;
    } else {
        hasAttribute = (elementToCheck) => elementToCheck.nodeName.toLowerCase() === type;
    }

    let currentElement = element;
    while (currentElement && !hasAttribute(currentElement) && (!elementLimit || currentElement !== elementLimit)) {
        currentElement = currentElement.parentNode;
    }

    return currentElement !== elementLimit ? currentElement : null;
};

export { findParent }
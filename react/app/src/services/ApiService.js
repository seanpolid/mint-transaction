import endpointType from '../enums/endpointType'

/**
 * Retrieves all data that matches the provided type.
 * @param {endpointType} type 
 * @returns 
 */
async function getData(type) {
    try {
        const uri = getUri(type);
        const response = await fetch(uri, {
            credentials: 'include'
        });
        return await response.json();
    } catch (exception) {
        console.log("exception:", exception);
    }
}

/**
 * Returns the URI that corresponds to the provided endpoint type and 
 * the current runtime environment. If an id is provided, it will be appended
 * to the uri as such: uri/id.
 * @param {endpointType} type 
 * @param {Number} id 
 * @returns 
 */
function getUri(type, id) {
    let host;
    if (import.meta.env.DEV) {
        host = "http://localhost:8080";
    } else {
        host = "http://localhost:8080";
    }

    const endpoints = {
        [endpointType.CATEGORIES]:  "/api/categories",
        [endpointType.GOALS]: "/api/goals",
        [endpointType.TRANSACTIONS]: '/api/transactions',
        [endpointType.TYPES]: "/api/types",
        [endpointType.USERS]: "/api/users"
    }

    let uri = `${host}${endpoints[type]}`;
    if (id) {
        uri = `${uri}/${id}`;
    }

    return uri;
}

/**
 * Sends a POST request to the appropriate endpoint. Any provided data 
 * will be JSON serialized prior to sending.
 * @param {endpointType} type 
 * @param {object} data 
 * @returns 
 */
async function postData(type, data) {
    try {
        const uri = getUri(type);
        const response = await fetch(uri, {
            method: 'POST', 
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            credentials: 'include'
        })

        return await response.json();
    } catch (exception) {
        console.log("exception:", exception);
        return [];
    }
}

/**
 * Sends a DELETE request to the appropriate endpoint based on
 * the type and provided id.
 * @param {endpointType} type 
 * @param {Number} id 
 * @returns 
 */
async function deleteData(type, id) {
    try {
        const uri = getUri(type, id);
        const response = await fetch(uri, {
            method: 'DELETE',
            credentials: 'include'
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

/**
 * Sends a PUT request to the appropriate endpoint. Any
 * provided data will be JSON serialized prior to sending.
 * @param {endpointType} type 
 * @param {object} data 
 * @returns 
 */
async function putData(type, data) {
    try {
        const uri = getUri(type);
        const response = await fetch(uri, {
            method: 'PUT',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
            credentials: 'include'
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

export default {
    getData: getData,
    postData: postData,
    deleteData: deleteData,
    putData: putData,
    getUri: getUri
}
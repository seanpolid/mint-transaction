import ApiContext from "./ApiContext";
import endpointType from '../enums/endpointType'

const ApiContextProvider = ({children}) => {
    const data = {
        getData: getData,
        postData: postData,
        deleteData: deleteData,
        putData: putData
    }

    return (
        <ApiContext.Provider value={data}>
            {children}
        </ApiContext.Provider>
    )
}

async function getData(type) {
    try {
        const uri = getUri(type);
        const response = await fetch(uri);
        return await response.json();
    } catch (exception) {
        console.log("exception:", exception);
    }
}

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

async function postData(type, data) {
    try {
        const uri = getUri(type);
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

async function deleteData(type, id) {
    try {
        const uri = getUri(type, id);
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

async function putData(type, data) {
    try {
        const uri = getUri(type);
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

export default ApiContextProvider
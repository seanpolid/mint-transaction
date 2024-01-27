import { createContext } from "react";

const ApiContext = createContext({
    getData: (type) => {},
    postData: (type, data) => {},
    deleteData: (type, id) => {},
    putData: (type, data) => {}
})

export default ApiContext
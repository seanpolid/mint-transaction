import { createContext } from "react";

const ApiContext = createContext({
    getData: async (type) => {},
    postData: async (type, data) => {},
    deleteData: async (type, id) => {},
    putData: async (type, data) => {}
})

export default ApiContext
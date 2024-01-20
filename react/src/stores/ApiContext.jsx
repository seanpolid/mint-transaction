import { createContext } from "react";

const ApiContext = createContext({
    getData: () => {},
    postData: () => {},
    deleteData: () => {},
    putData: () => {}
})

export default ApiContext
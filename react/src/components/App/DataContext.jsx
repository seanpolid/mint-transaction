import { createContext } from "react"

const DataContext = createContext({
    transactions: [],
    categories: [],
    types: [],
    goals: []
})

export default DataContext
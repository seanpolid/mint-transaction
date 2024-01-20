import { BrowserRouter } from "react-router-dom"
import DataContext from "../components/DataContext"
import { render } from "@testing-library/react"

const renderElement = (element, data) => {
    render(
        <BrowserRouter>
            <DataContext.Provider value={data}>
                {element}
            </DataContext.Provider>
        </BrowserRouter>
    )
}

export { renderElement }
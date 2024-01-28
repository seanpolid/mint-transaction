import { BrowserRouter } from "react-router-dom"
import MainProvider from "../stores/MainProvider"
import { render } from "@testing-library/react"

const renderElement = (element, selectedTransaction) => {
    render(
        <BrowserRouter>
            <MainProvider selectedTransaction={selectedTransaction}>
                {element}
            </MainProvider>
        </BrowserRouter>
    )
}

export { renderElement }
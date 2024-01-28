import { BrowserRouter } from "react-router-dom"
import MainProvider from "../stores/MainProvider"
import { render } from "@testing-library/react"

const renderElement = (element) => {
    render(
        <BrowserRouter>
            <MainProvider>
                {element}
            </MainProvider>
        </BrowserRouter>
    )
}

export { renderElement }
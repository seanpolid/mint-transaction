import { BrowserRouter } from "react-router-dom"
import { render } from "@testing-library/react"
import { ReactNode } from "react"

import { MainProvider } from "../stores/MainProvider"
import { Transaction } from "../models"

const renderElement = (element: ReactNode, selectedTransaction?: Transaction) => {
    render(
        <BrowserRouter>
            <MainProvider selectedTransaction={selectedTransaction}>
                {element}
            </MainProvider>
        </BrowserRouter>
    )
}

export { renderElement }
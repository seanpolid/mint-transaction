import DataContext from "../components/DataContext"
import { render } from "@testing-library/react"

const renderElement = (element, data) => {
    render(
        <DataContext.Provider value={data}>
            {element}
        </DataContext.Provider>
    )
}

export { renderElement }
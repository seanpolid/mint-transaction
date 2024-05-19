import apiService from "../services/ApiService";
import ForecastContext from "./ForecastContext";
import { useContext, useState } from "react";

const ForecastContextProvider = ({children}) => {
    const [newForecasts, setNewForecasts] = useState([]);

    const data = {
        newForecasts: newForecasts
    }

    return (
        <ForecastContext.Provider value={data}>
            {children}
        </ForecastContext.Provider>
    )
}

export default ForecastContextProvider
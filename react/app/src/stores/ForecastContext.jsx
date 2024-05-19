import { createContext } from "react";

const ForecastContext = createContext({
    selectedForecast: {},
    setSelectedForecast: () => {},

    newForecasts: [],
    
})

export default ForecastContext
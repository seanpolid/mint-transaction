import StatusContext from "./StatusContext";
import { useState } from "react";

const StatusContextProvider = ({children}) => {
    const [loadingData, setLoadingData] = useState(0);
    const [isNetworkError, setIsNetworkError] = useState(false);

    const incrementLoadingData = () => {
        setLoadingData(prevLoadingData => prevLoadingData + 1);
    }

    const decrementLoadingData = () => {
        setLoadingData(prevLoadingData => prevLoadingData - 1);
    }

    const networkErrorOccurred = () => {
        setIsNetworkError(true);
    }

    const data = {
        loadingData: loadingData,
        incrementLoadingData: incrementLoadingData,
        decrementLoadingData: decrementLoadingData,

        isNetworkError: isNetworkError,
        networkErrorOccurred: networkErrorOccurred 
    }

    return (
        <StatusContext.Provider value={data}>
            {children}
        </StatusContext.Provider>
    )
}

export default StatusContextProvider
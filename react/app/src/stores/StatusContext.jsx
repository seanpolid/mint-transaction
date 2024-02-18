import { createContext } from "react";

const StatusContext = createContext({
    loadingData: 0,
    incrementLoadingData: () => {},
    decrementLoadingData: () => {},

    isNetworkError: false,
    networkErrorOccurred: () => {}
})

export default StatusContext
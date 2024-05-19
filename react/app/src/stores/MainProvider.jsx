import DataContextProvider from "./DataContextProvider";
import ForecastContextProvider from './ForecastContextProvider'
import StatusContextProvider from "./StatusContextProvider";
import TransactionContextProvider from "./TransactionContextProvider";

const MainProvider = ({children, selectedTransaction}) => {
    return (
        <StatusContextProvider>
            <DataContextProvider>
                <TransactionContextProvider value={selectedTransaction}>
                    <ForecastContextProvider>
                        {children}
                    </ForecastContextProvider>
                </TransactionContextProvider>
            </DataContextProvider>
        </StatusContextProvider>
    )
}

export default MainProvider
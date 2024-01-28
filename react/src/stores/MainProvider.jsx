import ApiContextProvider from "./ApiContextProvider";
import DataContextProvider from "./DataContextProvider";
import GoalContextProvider from './GoalContextProvider';
import StatusContextProvider from "./StatusContextProvider";
import TransactionContextProvider from "./TransactionContextProvider";

const MainProvider = ({children, selectedTransaction}) => {
    return (
        <ApiContextProvider>
            <StatusContextProvider>
                <DataContextProvider>
                    <TransactionContextProvider value={selectedTransaction}>
                        <GoalContextProvider>
                            {children}
                        </GoalContextProvider>
                    </TransactionContextProvider>
                </DataContextProvider>
            </StatusContextProvider>
        </ApiContextProvider>
    )
}

export default MainProvider
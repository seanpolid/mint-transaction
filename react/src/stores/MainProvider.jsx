import ApiContextProvider from "./ApiContextProvider";
import DataContextProvider from "./DataContextProvider";
import GoalContextProvider from './GoalContextProvider';
import StatusContextProvider from "./StatusContextProvider";
import TransactionContextProvider from "./TransactionContextProvider";

const MainProvider = ({children}) => {
    return (
        <ApiContextProvider>
            <StatusContextProvider>
                <DataContextProvider>
                    <TransactionContextProvider>
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
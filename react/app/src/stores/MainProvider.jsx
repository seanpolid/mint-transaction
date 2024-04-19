import DataContextProvider from "./DataContextProvider";
import GoalContextProvider from './GoalContextProvider';
import StatusContextProvider from "./StatusContextProvider";
import TransactionContextProvider from "./TransactionContextProvider";

const MainProvider = ({children, selectedTransaction}) => {
    return (
        <StatusContextProvider>
            <DataContextProvider>
                <TransactionContextProvider value={selectedTransaction}>
                    <GoalContextProvider>
                        {children}
                    </GoalContextProvider>
                </TransactionContextProvider>
            </DataContextProvider>
        </StatusContextProvider>
    )
}

export default MainProvider
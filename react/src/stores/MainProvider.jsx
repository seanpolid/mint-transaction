import ApiContextProvider from "./ApiContextProvider";
import GoalContextProvider from './GoalContextProvider';
import StatusContextProvider from "./StatusContextProvider";
import TransactionContextProvider from "./TransactionContextProvider";

const MainProvider = ({children}) => {
    return (
        <ApiContextProvider>
            <StatusContextProvider>
                <TransactionContextProvider>
                    <GoalContextProvider>
                        {children}
                    </GoalContextProvider>
                </TransactionContextProvider>
            </StatusContextProvider>
        </ApiContextProvider>
    )
}

export default MainProvider
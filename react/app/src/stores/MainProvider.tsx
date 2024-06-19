import { DataContextProvider } from "./DataContextProvider";
import { ForecastContextProvider } from "./ForecastContextProvider";
import { TransactionContextProvider } from "./TransactionContextProvider";
import { ReactNode } from "react";

type Props = {
	children: ReactNode;
	selectedTransaction?: any; // for testing
};

export const MainProvider = (props: Props) => {
	return (
		<DataContextProvider>
			<TransactionContextProvider value={props.selectedTransaction}>
				<ForecastContextProvider>{props.children}</ForecastContextProvider>
			</TransactionContextProvider>
		</DataContextProvider>
	);
};

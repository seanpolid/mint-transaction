import { TabWithPages } from "../App";
import { Tab } from "../../enums";
import { ForecastPage } from "./ForecastPage";
import { TransactionPage } from "./TransactionPage";

type Props = {
	type: TabWithPages;
};

export const AddPage = (props: Props) => {
	const page = {
		[Tab.Transactions]: <TransactionPage />,
		[Tab.Forecasts]: <ForecastPage />,
	};

	return page[props.type];
};

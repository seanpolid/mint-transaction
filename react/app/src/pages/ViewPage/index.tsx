import { Tab } from "../../enums";
import { ForecastPage } from "./ForecastPage";
import { TransactionPage } from "./TransactionPage";
import { TabWithPages } from "../App";

import style from "./style.module.css";

type Props = {
	type: TabWithPages;
};

const ViewPage = (props: Props) => {
	const page = {
		[Tab.Transactions]: <TransactionPage />,
		[Tab.Forecasts]: <ForecastPage />,
	};

	return <section className={style.container}>{page[props.type]}</section>;
};

export default ViewPage;

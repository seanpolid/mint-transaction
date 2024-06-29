import { Options } from "../../../stores/DashboardContext";
import { LineGraph } from "../LineGraph";

import style from "./style.module.css";

export type SeriesData = {
	id: string;
	data: {
		x: string;
		y: number | null;
	}[];
};

export type Data = {
	seriesData: SeriesData[];
	net: number;
	projectedNet: number;
	totalNet: number;
	minValue: number;
};

type Props = {
	data: Data;
	options: Options;
};

type Margin = {
	top: number;
	right: number;
	bottom: number;
	left: number;
};

export const Graph = (props: Props) => {
	const { data, options } = props;

	const margin: Margin = {
		top: 10,
		right: options.projectIncome ? 140 : 110,
		bottom: 90,
		left: 75,
	};

	return (
		<div className={style.container}>
			<h1>
				Net: ${data.totalNet}{" "}
				{options.projectIncome ? <>(${data.projectedNet})</> : null}
			</h1>

			<LineGraph
				seriesData={data.seriesData}
				margin={margin}
				minValue={data.minValue}
			/>
		</div>
	);
};

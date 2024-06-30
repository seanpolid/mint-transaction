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
	maxValue: number;
	tickValues: string[]
};

type Props = {
	data: Data;
};

type Margin = {
	top: number;
	right: number;
	bottom: number;
	left: number;
};

export const Graph = (props: Props) => {
	const { data } = props;

	const margin: Margin = {
		top: 10,
		right: 140,
		bottom: 90,
		left: 75,
	};

	return (
		<div className={style.container}>
			<h1>
				Net: ${data.totalNet}{" "}
				{data.projectedNet > 0 ? <>(${data.projectedNet})</> : null}
			</h1>

			<LineGraph
				seriesData={data.seriesData}
				margin={margin}
				minValue={data.minValue}
				maxValue={data.maxValue}
				tickValues={data.tickValues}
			/>
		</div>
	);
};

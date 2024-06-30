import { ResponsiveLine } from "@nivo/line";

export const LineGraph = ({ seriesData, margin, minValue, maxValue, tickValues }) => {
	return (
		<ResponsiveLine
			data={seriesData}
			margin={{
				top: margin.top,
				right: margin.right,
				bottom: margin.bottom,
				left: margin.left,
			}}
			xScale={{ type: "point" }}
			yScale={{
				type: "linear",
				min: Math.min(minValue, 0),
				max: maxValue,
				max: "auto",
				stacked: false,
				reverse: false,
			}}
			yFormat=" >-.2f"
			axisTop={null}
			axisRight={null}
			axisBottom={{
				tickSize: 5,
				tickPadding: 5,
				tickRotation: -45,
				tickValues: tickValues,
				legend: "Date",
				legendOffset: 70,
				legendPosition: "middle",
				truncateTickAt: 0,
			}}
			axisLeft={{
				tickSize: 5,
				tickPadding: 5,
				tickRotation: 0,
				legend: "Amount ($)",
				legendOffset: -40,
				legendPosition: "middle",
				truncateTickAt: 0,
			}}
			colors={{ scheme: "paired" }}
			pointSize={10}
			pointColor={{ theme: "background" }}
			pointBorderWidth={2}
			pointBorderColor={{ from: "serieColor" }}
			pointLabel="data.yFormatted"
			pointLabelYOffset={-12}
			enableTouchCrosshair={true}
			useMesh={true}
			legends={[
				{
					anchor: "bottom-right",
					direction: "column",
					justify: false,
					translateX: 100,
					translateY: 0,
					itemsSpacing: 0,
					itemDirection: "left-to-right",
					itemWidth: 80,
					itemHeight: 20,
					itemOpacity: 0.75,
					symbolSize: 12,
					symbolShape: "circle",
					symbolBorderColor: "rgba(0, 0, 0, .5)",
					effects: [
						{
							on: "hover",
							style: {
								itemBackground: "rgba(0, 0, 0, .03)",
								itemOpacity: 1,
							},
						},
					],
				},
			]}
		/>
	);
};

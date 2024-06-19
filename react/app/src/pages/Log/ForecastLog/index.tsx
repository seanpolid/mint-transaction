import { HandleSelection } from "..";
import { Forecast } from "../../../models";

type Props = {
	forecast: Forecast;
	onClick: HandleSelection;
	selectedId: number | null;
};

export const ForecastLog = (props: Props) => {
	return <></>;
};

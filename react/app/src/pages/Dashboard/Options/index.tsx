import { ChangeEvent } from "react";

import {
	InputWithLabel,
	ToggleButtonWithLabel,
} from "../../../components";
import { Event } from "../../../components/ToggleButtonWithLabel";
import { Options as OptionsType } from "../../../stores/DashboardContext";
import { getDateString } from "../helpers";

import style from "./style.module.css";

type Props = {
	options: OptionsType;
	onChange: (event: ChangeEvent<HTMLInputElement> | Event) => void;
};

export const Options = (props: Props) => {
	const { options, onChange } = props;

	return (
		<section className={style.options}>
			<div className={style.range}>
				<h1>Options</h1>
				<div>
					<InputWithLabel
						id="startDate"
						name="startDate"
						text="Start Date:"
						type="date"
						max={getDateString(options.endDate)}
						value={getDateString(options.startDate)}
						onChange={onChange}
					/>
				</div>
				<div>
					<InputWithLabel
						id="endDate"
						name="endDate"
						text="End Date:"
						type="date"
						value={getDateString(options.endDate)}
						onChange={onChange}
					/>
				</div>
				<div className={style.net}>
					<ToggleButtonWithLabel
						id="displayNet"
						name="displayNet"
						text="Display Net:"
						onChange={onChange}
						value={options.displayNet}
					/>
				</div>
			</div>
		</section>
	);
};

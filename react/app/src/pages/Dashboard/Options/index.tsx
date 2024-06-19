import { ChangeEvent } from "react";

import {
	InputWithLabel,
	RadioButtonWithLabel,
	ToggleButtonWithLabel,
} from "../../../components";
import { Event } from "../../../components/ToggleButtonWithLabel";
import { getDateString } from "../helpers";
import { Options as OptionsType, DISPLAY_TYPE_OPTIONS } from "..";

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
				<h1>Range</h1>
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
			</div>
			<div className={style.display}>
				<h1>Display</h1>
				<div className={style.net}>
					<ToggleButtonWithLabel
						id="displayNet"
						name="displayNet"
						text="Net:"
						onChange={onChange}
						value={options.displayNet}
					/>
				</div>
				<fieldset>
					<legend>Income:</legend>
					<div>
						{DISPLAY_TYPE_OPTIONS.map((displayType) => (
							<RadioButtonWithLabel
								key={`${displayType} income`}
								id={`${displayType} income`}
								name="incomeDisplayType"
								value={displayType}
								text={displayType}
								checked={displayType === options.incomeDisplayType}
								onChange={onChange}
								wrapped
							/>
						))}
					</div>
				</fieldset>
				{options.incomeDisplayType !== "None" ? (
					<div className={style.projectIncome}>
						<ToggleButtonWithLabel
							id="projectIncome"
							name="projectIncome"
							text="Project:"
							onChange={onChange}
							value={options.projectIncome}
						/>
					</div>
				) : null}
				<fieldset>
					<legend>Expense:</legend>
					<div>
						{DISPLAY_TYPE_OPTIONS.map((displayType) => (
							<RadioButtonWithLabel
								key={`${displayType} expense`}
								id={`${displayType} income`}
								name="expenseDisplayType"
								value={displayType}
								text={displayType}
								checked={displayType === options.expenseDisplayType}
								onChange={onChange}
								wrapped
							/>
						))}
					</div>
				</fieldset>
			</div>
		</section>
	);
};

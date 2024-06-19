import { useState, useEffect, ChangeEvent, MouseEventHandler } from "react";

import { asTitleCase, findParent, compareString } from "../../utils/functions";
import { Sort, Order, Tab } from "../../enums";
import { TabWithPages } from "../../pages/App";
import { RadioButtonWithLabel } from "../RadioButtonWithLabel";

import style from "./style.module.css";

type Props = {
	initialSortTerm: Sort;
	initialSortOrder: Order;
	type: TabWithPages;
	onChange: (sortTerm: Sort, sortOrder: Order) => void;
};

const radioButtons = [
	{
		name: "order",
		text: asTitleCase(Order.Ascending),
		checked: false,
		value: Order.Ascending,
	},
	{
		name: "order",
		text: asTitleCase(Order.Descending),
		checked: true,
		value: Order.Descending,
	},
];

// The option names should correspond to the attributes of the object
// that will be sorted
const sortOptions = {
	[Tab.Transactions]: Object.values(Sort).sort((t1, t2) =>
		compareString(t1, t2)
	),
	[Tab.Forecasts]: [],
};

export const SortWindow = (props: Props) => {
	const { initialSortTerm, initialSortOrder, type, onChange } = props;

	const [sortTerm, setSortTerm] = useState(initialSortTerm);
	const [sortOrder, setSortOrder] = useState(initialSortOrder);

	useEffect(() => {
		onChange(sortTerm, sortOrder);
	}, [sortTerm, sortOrder]);

	const handleSortOrderChange = (event: ChangeEvent<HTMLInputElement>) => {
		const target = event.target;
		setSortOrder(target.value as Order);
	};

	const handleSortTermChange: MouseEventHandler<HTMLTableRowElement> = (
		event
	) => {
		const row = findParent(event.target as HTMLElement, { nodeName: "tr" });
		if (!row) return;

		const newSortTerm = row.getAttribute("data-value");
		if (!newSortTerm) return;

		setSortTerm(newSortTerm as Sort);
	};

	return (
		<div className={style.sortWindow}>
			<div>
				{radioButtons.map((button) => (
					<RadioButtonWithLabel
						key={button.text}
						id={button.name}
						name={button.name}
						text={button.text}
						value={button.value}
						checked={button.value === sortOrder}
						onChange={handleSortOrderChange}
						wrapped
					/>
				))}
			</div>
			<table>
				<tbody>
					{sortOptions[type].map((option) => (
						<tr key={option} onClick={handleSortTermChange} data-value={option}>
							<td className={option === sortTerm ? style.active : undefined}>
								{asTitleCase(option)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

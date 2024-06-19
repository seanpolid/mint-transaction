import { v4 } from "uuid";
import { ChangeEvent } from "react";

import { Item } from "..";

export type Props = {
	id?: string;
	name: string;
	items: Item[];
	value: Item["name"] | null;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const DatalistWithItems = (props: Props) => {
	const { id, name, items, value, onChange } = props;

	const uuid = v4();
	const datalistId = `${id}-${uuid}`;
	const datalistValue = value ? value : "";

	return (
		<div>
			<input
				list={datalistId}
				id={id}
				name={name}
				value={datalistValue}
				onChange={onChange}
			/>
			<datalist id={datalistId}>
				{items &&
					items.map((item) => (
						<option key={item.name} value={item.name}></option>
					))}
			</datalist>
		</div>
	);
};

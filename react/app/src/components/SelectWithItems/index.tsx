import { ChangeEvent } from "react";

import { Item } from "..";

export type Props = {
	id?: string;
	name: string;
	items: Item[];
	value: Item["id"] | null;
	onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
	ref?: any;
};

/**
 * Creates a select box with a set of options specified through the provided items.
 *
 * @param param0
 * @returns
 */
export const SelectWithItems = (props: Props) => {
	const { id, name, items, value, onChange, ref } = props;

	const selectValue = value ? value : "";

	return (
		<select
			id={id}
			name={name}
			onChange={onChange}
			value={selectValue}
			ref={ref}
		>
			<option hidden>-- Choose option --</option>
			{items &&
				items.map((item) => (
					<option key={item.id} value={item.id}>
						{item.name}
					</option>
				))}
		</select>
	);
};

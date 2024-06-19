import {
	SelectWithItems,
	Props as SelectWithItemsProps,
} from "../SelectWithItems";

type Props = {
	id: string;
	text: string;
	wrapped?: boolean;
} & SelectWithItemsProps;

export const SelectWithLabel = (props: Props) => {
	const { id, text, wrapped, ...remainingProps } = props;

	return (
		<>
			{wrapped ? (
				<label>
					{text}
					<SelectWithItems id={id} {...remainingProps} />
				</label>
			) : (
				<>
					<label htmlFor={id}>{text}</label>
					<SelectWithItems id={id} {...remainingProps} />
				</>
			)}
		</>
	);
};

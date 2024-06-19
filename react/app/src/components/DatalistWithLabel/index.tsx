import {
	DatalistWithItems,
	Props as DataListWithItemsProps,
} from "../DatalistWithItems";

type Props = {
	id: string;
	text: string;
	wrapped?: boolean;
} & DataListWithItemsProps;

export const DatalistWithLabel = (props: Props) => {
	const { id, text, wrapped, ...remainingProps } = props;

	return (
		<>
			{wrapped ? (
				<label>
					{text}
					<DatalistWithItems {...remainingProps} />
				</label>
			) : (
				<>
					<label htmlFor={id}>{text}</label>
					<DatalistWithItems id={id} {...remainingProps} />
				</>
			)}
		</>
	);
};

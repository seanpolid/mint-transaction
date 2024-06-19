import { ChangeEvent } from "react";

type Props = {
	id: string;
	name: string;
	text: string;
	value?: string | number;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
	checked: boolean;
	wrapped?: boolean;
};

export const RadioButtonWithLabel = (props: Props) => {
	const { id, text, wrapped, ...remainingProps } = props;

	return (
		<>
			{wrapped ? (
				<label>
					<input id={id} type="radio" {...remainingProps} />
					{text}
				</label>
			) : (
				<>
					<input id={id} type="radio" {...remainingProps} />
					<label htmlFor={id}>{text}</label>
				</>
			)}
		</>
	);
};

import { WheelEvent, ChangeEvent } from "react";

type BaseProps = {
	id: string;
	name: string;
	text: string;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
	wrapped?: boolean;
};

type TextInputProps = BaseProps & {
	type: "text";
	value: string;
};

type NumberInputProps = BaseProps & {
	type: "number";
	value: string | number;
	min?: number;
	max?: number;
	step?: number;
	onWheel?: (event: WheelEvent<HTMLInputElement>) => void;
};

type DateInputProps = BaseProps & {
	type: "date";
	value: string;
	min?: string;
	max?: string;
};

type CheckboxInputProps = BaseProps & {
	type: "checkbox";
	checked: boolean;
};

type Props =
	| TextInputProps
	| NumberInputProps
	| DateInputProps
	| CheckboxInputProps;

export const InputWithLabel = (props: Props) => {
	const { id, wrapped, text, ...remainingProps } = props;

	return (
		<>
			{wrapped ? (
				<label>
					{text}
					<input id={id} {...remainingProps} />
				</label>
			) : (
				<>
					<label htmlFor={id}>{text}</label>
					<input id={id} {...remainingProps} />
				</>
			)}
		</>
	);
};

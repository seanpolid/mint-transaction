import { ChangeEvent } from "react";

type Props = {
	id: string;
	name: string;
	text: string;
	value: string | null;
	className?: string;
	onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
	wrapped?: boolean;
};

export const TextAreaWithLabel = (props: Props) => {
	const { id, text, value, wrapped, ...remainingProps } = props;

	return (
		<>
			{wrapped ? (
				<label>
					{text}
					<textarea id={id} value={value ?? ""} {...remainingProps} />
				</label>
			) : (
				<>
					<label htmlFor={id}>{text}</label>
					<textarea id={id} value={value ?? ""} {...remainingProps} />
				</>
			)}
		</>
	);
};

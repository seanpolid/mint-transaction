import { useEffect, useState } from "react";

import style from "./style.module.css";

export type Event = {
	target: {
		name: string;
		text: string;
		value: boolean;
	};
};

type Props = {
	id: string;
	name: string;
	text: string;
	value: boolean;
	onChange: (event: Event) => void;
	wrapped?: boolean;
};

export const ToggleButtonWithLabel = (props: Props) => {
	const { id, name, text, value, onChange, wrapped } = props;

	const [currentValue, setCurrentValue] = useState(value);

	const className = currentValue
		? `${style.container} ${style.active}`
		: style.container;

	const handleOnClick = () => {
		setCurrentValue((prevCurrentValue) => !prevCurrentValue);
	};

	useEffect(() => {
		onChange({ target: { name, text, value: currentValue } });
	}, [currentValue]);

	return (
		<>
			{wrapped ? (
				<label onClick={handleOnClick}>
					<div className={className}>
						<div className={style.button}></div>
					</div>
					{text}
				</label>
			) : (
				<>
					<label htmlFor={id}>{text}</label>
					<div className={className} onClick={handleOnClick}>
						<div className={style.button}></div>
					</div>
				</>
			)}
		</>
	);
};

import { ReactNode } from "react";

import style from "./style.module.css";

type Props = {
	className: string;
	children: ReactNode;
};

export const Scrollpane = (props: Props) => {
	return (
		<div className={`${props.className} ${style.scrollpane}`}>
			{props.children}
		</div>
	);
};

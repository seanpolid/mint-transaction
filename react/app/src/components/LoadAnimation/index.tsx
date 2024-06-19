import { useState, useEffect } from "react";

import style from "./style.module.css";

export const LoadAnimation = () => {
	const [periods, setPeriods] = useState("");

	useEffect(() => {
		let numIntervals = 0;
		setInterval(() => {
			numIntervals++;
			setPeriods(() => {
				if (numIntervals == 1) {
					return ".";
				} else if (numIntervals == 2) {
					return "..";
				} else {
					numIntervals = 0;
					return "...";
				}
			});
		}, 1000);
	}, []);

	return (
		<div className={style.loadAnimation}>
			<div>
				<p>Retrieving Data{periods}</p>
				<div className={style.loadBar}></div>
			</div>
		</div>
	);
};

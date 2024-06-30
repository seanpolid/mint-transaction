import style from "./style.module.css";

export const LoadAnimation = () => {
	return (
		<div className={style.loadAnimation}>
			<div className={style.outerCircle}>
				<div className={style.ball}></div>
			</div>
		</div>
	);
};

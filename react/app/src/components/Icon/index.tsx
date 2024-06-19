import { Icon as IconType } from "../../enums";

import style from "./style.module.css";

type Props = {
	type: IconType;
	active?: boolean;
};

export const Icon = (props: Props) => {
	let icons = {
		[IconType.Log]: {
			className: style.container,
			content: <Log />,
		},
		[IconType.Graph]: {
			className: style.container,
			content: <Graph />,
		},
		[IconType.Target]: {
			className: `${style.container} ${style.target}`,
			content: <Target />,
		},
		[IconType.User]: {
			className: `${style.container} ${style.user}`,
			content: <User />,
		},
		[IconType.Filter]: {
			className: style.filter,
			content: <Filter />,
		},
		[IconType.Sort]: {
			className: style.sort,
			content: <Sort />,
		},
		[IconType.Search]: {
			className: style.search,
			content: <Search />,
		},
	};

	return (
		<div
			role="button"
			className={`icon ${icons[props.type].className} ${
				props.active ? style.active : ""
			}`}
			data-type={props.type}
		>
			{icons[props.type].content}
		</div>
	);
};

const Log = () => {
	return (
		<>
			<div className={style.log} aria-label="transactions">
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
			<div className={style.logLabel}>LOG</div>
		</>
	);
};

const Graph = () => {
	return (
		<>
			<div className={style.bars} aria-label="dashboard">
				<div></div>
				<div></div>
				<div></div>
			</div>
			<div className={style.line}></div>
		</>
	);
};

const Target = () => {
	return (
		<>
			<div className={style.ring} aria-label="forecasts">
				<div className={style.ring}>
					<div className={style.ring}></div>
				</div>
			</div>
			<div className={style.arrow}></div>
			<div className={style.leftTail}></div>
			<div className={style.rightTail}></div>
		</>
	);
};

const User = () => {
	return (
		<>
			<div className={style.frame} aria-label="profile">
				<div className={style.head}></div>
				<div className={style.body}></div>
			</div>
		</>
	);
};

const Filter = () => {
	return (
		<>
			<div></div>
		</>
	);
};

const Sort = () => {
	return (
		<>
			<div className={style.bars} aria-label="sort items">
				<div></div>
				<div></div>
				<div></div>
			</div>
			<div className={style.arrow}></div>
			<div className={style.arrowHead}></div>
		</>
	);
};

const Search = () => {
	return (
		<>
			<div className={style.handle} aria-label="search items"></div>
		</>
	);
};

export default Icon;

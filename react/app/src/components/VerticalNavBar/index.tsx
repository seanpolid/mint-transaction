import {
	useEffect,
	useState,
	useCallback,
	MouseEvent,
	ReactElement,
} from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { findParent } from "../../utils/functions";
import { Icon } from "../Icon";
import { Icon as IconType, Tab } from "../../enums";
import { links } from "../../config/links";
import { State } from "../../pages/App/helpers";

import style from "./style.module.css";

const tabIconMapping = {
	[Tab.Transactions]: IconType.Log,
	[Tab.Dashboard]: IconType.Graph,
	[Tab.Forecasts]: IconType.Target,
	[Tab.Profile]: IconType.User,
};

type Props = {
	pageState: State;
};

export const VerticalNavBar = (props: Props) => {
	const [icons, setIcons] = useState<ReactElement[]>([]);
	const [net, setNet] = useState(14000);
	const navigate = useNavigate();

	const handleClick = useCallback(
		(event: MouseEvent<HTMLAnchorElement>) => {
			event.preventDefault();

			const target = findParent(event.target as HTMLElement, {
				nodeName: "li",
			});
			if (!target) return;

			const type = target.getAttribute("data-type");
			if (target === null || type === null) return;

			switch (type) {
				case Tab.Transactions:
				case Tab.Forecasts:
					navigate(`${links[type]}/${props.pageState[type]}`);
					break;
				case Tab.Dashboard:
					navigate(`${links[type]}`);
					break;
				case Tab.Profile:
					navigate(`${links[type]}`);
			}
		},
		[props.pageState]
	);

	useEffect(() => {
		setIcons(
			Object.values(Tab).map((tab) => (
				<li key={tab} data-type={tab}>
					<NavLink
						to={links[tab]}
						onClick={handleClick}
						className={({ isActive }) =>
							isActive ? style.active : style.normal
						}
					>
						<Icon type={tabIconMapping[tab]} />
					</NavLink>
				</li>
			))
		);
	}, [handleClick]);

	return (
		<>
			<nav className={style.container} aria-label="Primary Navigation">
				<ul>
					{icons.filter((icon) => icon.props["data-type"] !== Tab.Profile)}
					{icons.filter((icon) => icon.props["data-type"] === Tab.Profile)}
				</ul>
			</nav>
			<p className={getNetStyling(net)}>
				{net > 0 ? "+" : ""}
				{net}
			</p>
		</>
	);
};

const getNetStyling = (net: number): string => {
	let netStyling = "";
	if (net > 0) {
		netStyling = `${style.net} ${style.positive}`;
	} else if (net < 0) {
		netStyling = `${style.net} ${style.negative}`;
	} else {
		netStyling = `${style.net} ${style.zero}`;
	}
	return netStyling;
};

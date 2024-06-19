import { ChangeEvent } from "react";

import { Icon as IconType } from "../../enums";
import { Icon } from "../Icon";

import style from "./style.module.css";

type Props = {
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const SearchBar = (props: Props) => {
	return (
		<div className={style.searchBar}>
			<input type="text" placeholder="Search" onChange={props.onChange} />
			<Icon type={IconType.Search} />
		</div>
	);
};

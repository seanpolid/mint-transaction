import {
	useContext,
	useEffect,
	useState,
	memo,
	useMemo,
	ChangeEvent,
	MouseEventHandler,
} from "react";

import { Icon as IconType, Tab, Order, Sort } from "../../enums";
import { Scrollpane, Icon, SearchBar, SortWindow } from "../../components";
import { DataContext } from "../../stores";
import { Forecast, Transaction } from "../../models";
import { TabWithPages } from "../App";
import { compareTransactions, compareForecasts } from "./functions";
import { TransactionLog } from "./TransactionLog";
import { ForecastLog } from "./ForecastLog";

import style from "./style.module.css";

export type HandleSelection = (
	selectedItem: Transaction | Forecast,
	switchToView: boolean
) => void;

type Props = {
	type: TabWithPages;
	handleSelection: HandleSelection;
	selectedId: number | null;
};

export const Log = memo((props: Props) => {
	const { type, handleSelection, selectedId } = props;

	const [searchTerm, setSearchTerm] = useState("");
	const [sortTerm, setSortTerm] = useState(Sort.Date);
	const [sortOrder, setSortOrder] = useState(Order.Descending);
	const [sortWindowVisible, setSortWindowVisible] = useState<boolean>(false);
	const dc = useContext(DataContext);

	const preparedItems: Transaction[] | Forecast[] = useMemo(() => {
		const items = {
			[Tab.Transactions]: dc.transactions,
			[Tab.Forecasts]: dc.forecasts,
		};

		const loweredSearchTerm = searchTerm.toLowerCase();
		const filteredItems = items[type].filter(
			(item) =>
				searchTerm.length == 0 ||
				item.toString().toLowerCase().includes(loweredSearchTerm)
		);
		return filteredItems.sort((f1, f2) => {
			if (f1 instanceof Transaction && f2 instanceof Transaction) {
				return compareTransactions(sortTerm, sortOrder, f1, f2);
			} else {
				return compareForecasts(sortTerm, sortOrder, f1, f2);
			}
		}) as Transaction[] | Forecast[];
	}, [
		type,
		searchTerm,
		sortTerm,
		sortOrder,
		dc.transactions,
		dc.forecasts,
		selectedId,
	]);

	useEffect(() => {
		if (preparedItems.length > 0 && selectedId === null) {
			handleSelection(preparedItems[0], false);
		}
	}, [preparedItems]);

	const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
	};

	const handleSortChange = (sortTerm: Sort, sortOrder: Order) => {
		setSortTerm(sortTerm);
		setSortOrder(sortOrder);
	};

	const handleSortClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
		event.preventDefault();
		setSortWindowVisible((prev) => !prev);
	};

	const handleOverlayClick: MouseEventHandler<HTMLDivElement> = (event) => {
		event.preventDefault();
		setSortWindowVisible(false);
	};

	return (
		<section className={style.container}>
			<form>
				<SearchBar onChange={handleSearchChange} />
				<a href="#" onClick={handleSortClick}>
					<Icon type={IconType.Sort} />
				</a>
				{sortWindowVisible ? (
					<>
						<SortWindow
							initialSortTerm={sortTerm}
							initialSortOrder={sortOrder}
							type={type}
							onChange={handleSortChange}
						/>
						<div
							id="overlay"
							className={style.overlay}
							onClick={handleOverlayClick}
						></div>
					</>
				) : null}
			</form>

			<Scrollpane className={style.log}>
				<table>
					<tbody>
						{preparedItems.map((item) =>
							convertToLog(type, item, handleSelection, selectedId)
						)}
					</tbody>
				</table>
			</Scrollpane>
		</section>
	);
});

function convertToLog(
	type: Tab.Transactions | Tab.Forecasts,
	item: Transaction | Forecast,
	onClick: HandleSelection,
	selectedId: number | null
): JSX.Element {
	const logs = {
		[Tab.Transactions]: (
			<TransactionLog
				key={(item as Transaction).identifier}
				transaction={item as Transaction}
				onClick={onClick}
				selectedId={selectedId}
			/>
		),
		[Tab.Forecasts]: (
			<ForecastLog
				key={item.id}
				forecast={item as Forecast}
				onClick={onClick}
				selectedId={selectedId}
			/>
		),
	};

	return logs[type] as JSX.Element;
}

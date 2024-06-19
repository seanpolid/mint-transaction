import {
	useEffect,
	useState,
	useContext,
	useReducer,
	useCallback,
	MouseEvent,
} from "react";
import {
	Routes,
	Route,
	NavLink,
	Outlet,
	useNavigate,
	useLocation,
} from "react-router-dom";
import { v4 } from "uuid";

import { Context as TransactionContextType } from "../../stores/TransactionContext";
import { Context as ForecastContextType } from "../../stores/ForecastContext";
import { DataContext, TransactionContext, ForecastContext } from "../../stores";
import { Tab, Page } from "../../enums";
import { links } from "../../config/links";
import { AddPage } from "../AddPage";
import { Dashboard } from "../Dashboard";
import { LoadAnimation, VerticalNavBar } from "../../components";
import ViewPage from "../ViewPage";
import { Log } from "../Log";
import Profile from "../Profile";
import { pageReducer, isTabWithPages, isPage } from "./helpers";

import style from "./style.module.css";
import { Forecast, Transaction } from "../../models";

export type TabWithPages = Tab.Transactions | Tab.Forecasts;

const tabsWithPages: TabWithPages[] = [Tab.Transactions, Tab.Forecasts];

const initialPageState = {
	[Tab.Transactions]: Page.Add,
	[Tab.Forecasts]: Page.Add,
};

const App = () => {
	const [pageState, dispatch] = useReducer(pageReducer, initialPageState);
	const dataContext = useContext(DataContext);
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		if (location.pathname === "/") {
			navigate("/transactions/add");
		}
	}, []);

	const handleClick = (event: MouseEvent<HTMLElement>) => {
		const target = event.target as HTMLElement;
		const type = target.getAttribute("data-type");
		const page = target.getAttribute("data-page");

		if (isTabWithPages(type) && isPage(page)) {
			dispatch({ type: type, page: page });
		}
	};

	return (
		<>
			<VerticalNavBar pageState={pageState} />

			{dataContext.isLoadingData && <LoadAnimation />}

			{!dataContext.isLoadingData && dataContext.hasNetworkError && (
				<NetworkError />
			)}

			{!dataContext.isLoadingData && !dataContext.hasNetworkError && (
				<Routes>
					<Route path={links[Tab.Dashboard]} element={<Dashboard />} />
					<Route path={links[Tab.Profile]} element={<Profile />} />

					{tabsWithPages.map((type) => (
						<Route
							key={v4()}
							path={`${links[type]}`}
							element={<TabWithPages type={type} onClick={handleClick} />}
						>
							<Route path={Page.View} element={<ViewPage type={type} />} />
							<Route path={Page.Add} element={<AddPage type={type} />} index />
						</Route>
					))}
				</Routes>
			)}
		</>
	);
};

const NetworkError = () => {
	return (
		<div className={style.networkError}>
			<h1>Could not communicate with server. Please try again later.</h1>
		</div>
	);
};

type Props = {
	type: TabWithPages;
	onClick: (event: MouseEvent<HTMLAnchorElement>) => void;
};

const TabWithPages = (props: Props) => {
	const { type, onClick } = props;

	const tc = useContext(TransactionContext);
	const fc = useContext(ForecastContext);
	const [selectedId, setSelectedId] = useState(getSelectedId(type, tc, fc));
	const navigate = useNavigate();

	useEffect(() => {
		if (type === Tab.Transactions) {
			setSelectedId(tc.selectedTransaction ? tc.selectedTransaction.id : null);
		} else if (type === Tab.Forecasts) {
			setSelectedId(fc.selectedForecast ? fc.selectedForecast.id : null);
		}
	}, [tc.selectedTransaction, fc.selectedForecast]);

	// Necessary to handle selection at this level to prevent unnecessary rerendering of
	// log when TransactionContext or ForecastContext get updated from AddPage
	const handleSelection = useCallback(
		(selectedItem: Transaction | Forecast, switchToView: boolean) => {
			const viewLinks = {
				[Tab.Transactions]: `${links[Tab.Transactions]}/view`,
				[Tab.Forecasts]: `${links[Tab.Forecasts]}/view`,
			};

			if (selectedItem instanceof Transaction) {
				tc.setSelectedTransaction(selectedItem);
			} else {
				fc.setSelectedForecast(selectedItem);
			}

			if (switchToView) {
				navigate(viewLinks[type]);
			}
		},
		[type]
	);

	return (
		<>
			<Log
				type={type}
				handleSelection={handleSelection}
				selectedId={selectedId}
			/>

			<section>
				<nav className={style.secondaryNav} aria-label="Secondary Navigation">
					<ul>
						<li>
							<NavLink
								to={"view"}
								className={({ isActive }) => (isActive ? style.active : "")}
								onClick={onClick}
								data-type={type}
								data-page={Page.View}
							>
								View
							</NavLink>
						</li>
						<li>
							<NavLink
								to={"add"}
								className={({ isActive }) => (isActive ? style.active : "")}
								onClick={onClick}
								data-type={type}
								data-page={Page.Add}
							>
								Add
							</NavLink>
						</li>
					</ul>
				</nav>

				<Outlet />
			</section>
		</>
	);
};

function getSelectedId(
	type: TabWithPages,
	transactionContext: TransactionContextType,
	forecastContext: ForecastContextType
): number | null {
	if (type === Tab.Transactions && transactionContext.selectedTransaction) {
		return transactionContext.selectedTransaction.id;
	} else if (type === Tab.Forecasts && forecastContext.selectedForecast) {
		return forecastContext.selectedForecast.id;
	}

	return null;
}

export default App;

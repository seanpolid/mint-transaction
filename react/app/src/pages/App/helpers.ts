import { Tab, Page } from "../../enums";
import { TabWithPages } from ".";

export type State = {
	[Tab.Transactions]: Page;
	[Tab.Forecasts]: Page;
};

type Action = {
	type: TabWithPages;
	page: Page;
};

export function pageReducer(state: State, action: Action) {
	return {
		...state,
		[action.type]: action.page,
	};
}

export function isTabWithPages(type: string | null): type is TabWithPages {
	return type === Tab.Transactions || type === Tab.Forecasts;
}

export function isPage(page: string | null): page is Page {
	return page === "Add" || page === "View";
}

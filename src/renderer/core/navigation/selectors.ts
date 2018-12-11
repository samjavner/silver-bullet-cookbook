import { globalizeSelectors } from "../util";
import { moduleName, State } from "./model";

export const getActiveArea = (state: State) => state.activeArea;

export const getActiveHomePage = (state: State) => state.activeHomePage;

export const getActiveRecipesPage = (state: State) => state.activeRecipesPage;

export const getActiveCalendarPage = (state: State) => state.activeCalendarPage;

export const getActiveShoppingPage = (state: State) => state.activeShoppingPage;

export const getActiveReferencePage = (state: State) =>
    state.activeReferencePage;

export const getActiveToolsPage = (state: State) => state.activeToolsPage;

export const getActiveSettingsPage = (state: State) => state.activeSettingsPage;

const selectors = {
    getActiveArea,
    getActiveHomePage,
    getActiveRecipesPage,
    getActiveCalendarPage,
    getActiveShoppingPage,
    getActiveReferencePage,
    getActiveToolsPage,
    getActiveSettingsPage,
};

export default globalizeSelectors<State, typeof selectors>(
    moduleName,
    selectors
);

import { SetState, useSelector } from "../store";

export type Navigation = ReturnType<typeof selector>;

export const useNavigation = (): Navigation => useSelector(selector, init);

// MODEL

interface State {
    activeArea: AreaName;
    activeHomePage: HomePageName;
    activeRecipesPage: RecipesPageName;
    activeCalendarPage: CalendarPageName;
    activeShoppingPage: ShoppingPageName;
    activeReferencePage: ReferencePageName;
    activeToolsPage: ToolsPageName;
    activeSettingsPage: SettingsPageName;
}

export type AreaName =
    | "home"
    | "recipes"
    | "calendar"
    | "shopping"
    | "reference"
    | "tools"
    | "settings";

export type HomePageName = "home";

export type RecipesPageName =
    | "library"
    | "recipe_box"
    | "favorites"
    | "tags"
    | "search";

export type ShoppingPageName = "grocery_lists" | "inventory";

export type CalendarPageName = "calendar";

export type ReferencePageName = "dictionary" | "nutrition";

export type ToolsPageName =
    | "calculator"
    | "timer"
    | "import"
    | "export"
    | "statistics";

export type SettingsPageName = "settings" | "about";

const init: State = {
    activeArea: "home",
    activeHomePage: "home",
    activeRecipesPage: "recipe_box",
    activeCalendarPage: "calendar",
    activeShoppingPage: "grocery_lists",
    activeReferencePage: "dictionary",
    activeToolsPage: "calculator",
    activeSettingsPage: "settings",
};

// SELECTOR

const selector = (snapshot: State, setState: SetState<State>) => {
    const setActiveArea = (area: AreaName) =>
        setState(state => ({ ...state, activeArea: area }));

    const setActiveHomePage = (page: HomePageName) =>
        setState(state => ({ ...state, activeHomePage: page }));

    const setActiveRecipesPage = (page: RecipesPageName) =>
        setState(state => ({ ...state, activeRecipesPage: page }));

    const setActiveCalendarPage = (page: CalendarPageName) =>
        setState(state => ({ ...state, activeCalendarPage: page }));

    const setActiveShoppingPage = (page: ShoppingPageName) =>
        setState(state => ({ ...state, activeShoppingPage: page }));

    const setActiveReferencePage = (page: ReferencePageName) =>
        setState(state => ({ ...state, activeReferencePage: page }));

    const setActiveToolsPage = (page: ToolsPageName) =>
        setState(state => ({ ...state, activeToolsPage: page }));

    const setActiveSettingsPage = (page: SettingsPageName) =>
        setState(state => ({ ...state, activeSettingsPage: page }));

    return {
        ...snapshot,
        setActiveArea,
        setActiveHomePage,
        setActiveRecipesPage,
        setActiveCalendarPage,
        setActiveShoppingPage,
        setActiveReferencePage,
        setActiveToolsPage,
        setActiveSettingsPage,
    };
};

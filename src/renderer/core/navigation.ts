import { Store, UseStore } from "../store";

export type Navigation = Store<Model, Update>;

export function useNavigation(useStore: UseStore<Model, Update>): Navigation {
    return useStore({
        init,
        update,
    });
}

// MODEL

export interface Model {
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

export const init: Model = {
    activeArea: "home",
    activeHomePage: "home",
    activeRecipesPage: "recipe_box",
    activeCalendarPage: "calendar",
    activeShoppingPage: "grocery_lists",
    activeReferencePage: "dictionary",
    activeToolsPage: "calculator",
    activeSettingsPage: "settings",
};

// UPDATE

type Update = typeof update;

export const update = {
    setActiveArea(model: Model, area: AreaName): Model {
        return {
            ...model,
            activeArea: area,
        };
    },
    setActiveHomePage(model: Model, page: HomePageName): Model {
        return {
            ...model,
            activeHomePage: page,
        };
    },
    setActiveRecipesPage(model: Model, page: RecipesPageName): Model {
        return {
            ...model,
            activeRecipesPage: page,
        };
    },
    setActiveCalendarPage(model: Model, page: CalendarPageName): Model {
        return {
            ...model,
            activeCalendarPage: page,
        };
    },
    setActiveShoppingPage(model: Model, page: ShoppingPageName): Model {
        return {
            ...model,
            activeShoppingPage: page,
        };
    },
    setActiveReferencePage(model: Model, page: ReferencePageName): Model {
        return {
            ...model,
            activeReferencePage: page,
        };
    },
    setActiveToolsPage(model: Model, page: ToolsPageName): Model {
        return {
            ...model,
            activeToolsPage: page,
        };
    },
    setActiveSettingsPage(model: Model, page: SettingsPageName): Model {
        return {
            ...model,
            activeSettingsPage: page,
        };
    },
};

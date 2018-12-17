import {
    faArchive,
    faBook,
    faBox,
    faCalculator,
    faCalendar,
    faChartPie,
    faCog,
    faFileExport,
    faFileImport,
    faHeart,
    faHeartbeat,
    faHome,
    faInfoCircle,
    faSearch,
    faShoppingCart,
    faStopwatch,
    faTags,
} from "@fortawesome/free-solid-svg-icons";
import * as React from "react";
import {
    NavbarProps,
    NavigationLayout,
    TabProps,
} from "../components/navigation";
import * as calendar from "./calendar/calendar";
import * as home from "./home/home";
import * as favorites from "./recipes/favorites";
import * as library from "./recipes/library";
import * as recipeBox from "./recipes/recipeBox";
import * as search from "./recipes/search";
import * as tags from "./recipes/tags";
import * as dictionary from "./reference/dictionary";
import * as nutrition from "./reference/nutrition";
import * as about from "./settings/about";
import * as settings from "./settings/settings";
import * as groceryLists from "./shopping/groceryLists";
import * as inventory from "./shopping/inventory";
import * as calculator from "./tools/calculator";
import * as toolsExport from "./tools/export";
import * as toolsImport from "./tools/import";
import * as statistics from "./tools/statistics";
import * as timer from "./tools/timer";
import * as util from "./util";

// MODEL

export interface Model {
    activeArea: Area;
    activeHomePage: HomePage;
    activeRecipesPage: RecipesPage;
    activeCalendarPage: CalendarPage;
    activeShoppingPage: ShoppingPage;
    activeReferencePage: ReferencePage;
    activeToolsPage: ToolsPage;
    activeSettingsPage: SettingsPage;
}

export type Area =
    | "home"
    | "recipes"
    | "calendar"
    | "shopping"
    | "reference"
    | "tools"
    | "settings";

export type HomePage = "home";

export type RecipesPage =
    | "library"
    | "recipe_box"
    | "favorites"
    | "tags"
    | "search";

export type ShoppingPage = "grocery_lists" | "inventory";

export type CalendarPage = "calendar";

export type ReferencePage = "dictionary" | "nutrition";

export type ToolsPage =
    | "calculator"
    | "timer"
    | "import"
    | "export"
    | "statistics";

export type SettingsPage = "settings" | "about";

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

export const update = {
    setActiveArea(model: Model, area: Area): Model {
        return {
            ...model,
            activeArea: area,
        };
    },
    setActiveHomePage(model: Model, page: HomePage): Model {
        return {
            ...model,
            activeHomePage: page,
        };
    },
    setActiveRecipesPage(model: Model, page: RecipesPage): Model {
        return {
            ...model,
            activeRecipesPage: page,
        };
    },
    setActiveCalendarPage(model: Model, page: CalendarPage): Model {
        return {
            ...model,
            activeCalendarPage: page,
        };
    },
    setActiveShoppingPage(model: Model, page: ShoppingPage): Model {
        return {
            ...model,
            activeShoppingPage: page,
        };
    },
    setActiveReferencePage(model: Model, page: ReferencePage): Model {
        return {
            ...model,
            activeReferencePage: page,
        };
    },
    setActiveToolsPage(model: Model, page: ToolsPage): Model {
        return {
            ...model,
            activeToolsPage: page,
        };
    },
    setActiveSettingsPage(model: Model, page: SettingsPage): Model {
        return {
            ...model,
            activeSettingsPage: page,
        };
    },
};

// VIEW

export type ViewModel = util.ViewModel<Model, typeof update>;

export interface Props {
    vm: ViewModel;
    recipeBoxVm: recipeBox.ViewModel;
    statisticsVm: statistics.ViewModel;
}

export const Navigation: React.FunctionComponent<Props> = props => (
    <NavigationLayout
        navbar={getNavbar(props.vm)}
        tabs={getTabs(props.vm)}
        page={getPage(props)}
    />
);

// NAVBAR

function getNavbar({ activeArea, setActiveArea }: ViewModel): NavbarProps {
    return {
        left: [
            {
                isActive: activeArea === "home",
                onClick: () => setActiveArea("home"),
                icon: faHome,
            },
            {
                isActive: activeArea === "recipes",
                onClick: () => setActiveArea("recipes"),
                text: "Recipes",
            },
            {
                isActive: activeArea === "calendar",
                onClick: () => setActiveArea("calendar"),
                text: "Calendar",
            },
            {
                isActive: activeArea === "shopping",
                onClick: () => setActiveArea("shopping"),
                text: "Shopping",
            },
            {
                isActive: activeArea === "reference",
                onClick: () => setActiveArea("reference"),
                text: "Reference",
            },
            {
                isActive: activeArea === "tools",
                onClick: () => setActiveArea("tools"),
                text: "Tools",
            },
        ],
        right: [
            {
                isActive: activeArea === "settings",
                onClick: () => setActiveArea("settings"),
                icon: faCog,
            },
        ],
    };
}

// TABS

function getTabs(vm: ViewModel): TabProps[] {
    switch (vm.activeArea) {
        case "home":
            return getHomeTabs(vm.activeHomePage, vm.setActiveHomePage);
        case "recipes":
            return getRecipesTabs(
                vm.activeRecipesPage,
                vm.setActiveRecipesPage
            );
        case "calendar":
            return getCalendarTabs(
                vm.activeCalendarPage,
                vm.setActiveCalendarPage
            );
        case "shopping":
            return getShoppingTabs(
                vm.activeShoppingPage,
                vm.setActiveShoppingPage
            );
        case "reference":
            return getReferenceTabs(
                vm.activeReferencePage,
                vm.setActiveReferencePage
            );
        case "tools":
            return getToolsTabs(vm.activeToolsPage, vm.setActiveToolsPage);
        case "settings":
            return getSettingsTabs(
                vm.activeSettingsPage,
                vm.setActiveSettingsPage
            );
    }
}

function getHomeTabs(
    activePage: HomePage,
    setActivePage: (page: HomePage) => void
): TabProps[] {
    return [
        {
            isActive: activePage === "home",
            onClick: () => setActivePage("home"),
            icon: faHome,
            text: "Home",
        },
    ];
}

function getRecipesTabs(
    activePage: RecipesPage,
    setActivePage: (page: RecipesPage) => void
): TabProps[] {
    return [
        {
            isActive: activePage === "recipe_box",
            onClick: () => setActivePage("recipe_box"),
            icon: faArchive,
            text: "Recipe Box",
        },
        {
            isActive: activePage === "library",
            onClick: () => setActivePage("library"),
            icon: faBook,
            text: "Library",
        },
        {
            isActive: activePage === "favorites",
            onClick: () => setActivePage("favorites"),
            icon: faHeart,
            text: "Favorites",
        },
        {
            isActive: activePage === "tags",
            onClick: () => setActivePage("tags"),
            icon: faTags,
            text: "Tags",
        },
        {
            isActive: activePage === "search",
            onClick: () => setActivePage("search"),
            icon: faSearch,
            text: "Search",
        },
    ];
}

function getCalendarTabs(
    activePage: CalendarPage,
    setActivePage: (page: CalendarPage) => void
): TabProps[] {
    return [
        {
            isActive: activePage === "calendar",
            onClick: () => setActivePage("calendar"),
            icon: faCalendar,
            text: "Calendar",
        },
    ];
}

function getShoppingTabs(
    activePage: ShoppingPage,
    setActivePage: (page: ShoppingPage) => void
): TabProps[] {
    return [
        {
            isActive: activePage === "grocery_lists",
            onClick: () => setActivePage("grocery_lists"),
            icon: faShoppingCart,
            text: "Grocery Lists",
        },
        {
            isActive: activePage === "inventory",
            onClick: () => setActivePage("inventory"),
            icon: faBox,
            text: "Inventory",
        },
    ];
}

function getReferenceTabs(
    activePage: ReferencePage,
    setActivePage: (page: ReferencePage) => void
): TabProps[] {
    return [
        {
            isActive: activePage === "dictionary",
            onClick: () => setActivePage("dictionary"),
            icon: faBook,
            text: "Dictionary",
        },
        {
            isActive: activePage === "nutrition",
            onClick: () => setActivePage("nutrition"),
            icon: faHeartbeat,
            text: "Nutrition",
        },
    ];
}

function getToolsTabs(
    activePage: ToolsPage,
    setActivePage: (page: ToolsPage) => void
): TabProps[] {
    return [
        {
            isActive: activePage === "calculator",
            onClick: () => setActivePage("calculator"),
            icon: faCalculator,
            text: "Calculator",
        },
        {
            isActive: activePage === "timer",
            onClick: () => setActivePage("timer"),
            icon: faStopwatch,
            text: "Timer",
        },
        {
            isActive: activePage === "import",
            onClick: () => setActivePage("import"),
            icon: faFileImport,
            text: "Import",
        },
        {
            isActive: activePage === "export",
            onClick: () => setActivePage("export"),
            icon: faFileExport,
            text: "Export",
        },
        {
            isActive: activePage === "statistics",
            onClick: () => setActivePage("statistics"),
            icon: faChartPie,
            text: "Statistics",
        },
    ];
}

function getSettingsTabs(
    activePage: SettingsPage,
    setActivePage: (page: SettingsPage) => void
): TabProps[] {
    return [
        {
            isActive: activePage === "settings",
            onClick: () => setActivePage("settings"),
            icon: faCog,
            text: "Settings",
        },
        {
            isActive: activePage === "about",
            onClick: () => setActivePage("about"),
            icon: faInfoCircle,
            text: "About",
        },
    ];
}

// PAGE

function getPage(props: Props): React.ReactElement<any> {
    switch (props.vm.activeArea) {
        case "home":
            return getHomePage(props);
        case "recipes":
            return getRecipesPage(props);
        case "calendar":
            return getCalendarPage(props);
        case "shopping":
            return getShoppingPage(props);
        case "reference":
            return getReferencePage(props);
        case "tools":
            return getToolsPage(props);
        case "settings":
            return getSettingsPage(props);
    }
}

function getHomePage(props: Props): React.ReactElement<any> {
    switch (props.vm.activeHomePage) {
        case "home":
            return <home.Page />;
    }
}

function getRecipesPage(props: Props): React.ReactElement<any> {
    switch (props.vm.activeRecipesPage) {
        case "recipe_box":
            return (
                <recipeBox.Page
                    vm={props.recipeBoxVm}
                    statisticsVm={props.statisticsVm}
                />
            );
        case "library":
            return <library.Page />;
        case "favorites":
            return <favorites.Page />;
        case "tags":
            return <tags.Page />;
        case "search":
            return <search.Page />;
    }
}

function getCalendarPage(props: Props): React.ReactElement<any> {
    switch (props.vm.activeCalendarPage) {
        case "calendar":
            return <calendar.Page />;
    }
}

function getShoppingPage(props: Props): React.ReactElement<any> {
    switch (props.vm.activeShoppingPage) {
        case "grocery_lists":
            return <groceryLists.Page />;
        case "inventory":
            return <inventory.Page />;
    }
}

function getReferencePage(props: Props): React.ReactElement<any> {
    switch (props.vm.activeReferencePage) {
        case "dictionary":
            return <dictionary.Page />;
        case "nutrition":
            return <nutrition.Page />;
    }
}

function getToolsPage(props: Props): React.ReactElement<any> {
    switch (props.vm.activeToolsPage) {
        case "calculator":
            return <calculator.Page />;
        case "timer":
            return <timer.Page />;
        case "import":
            return <toolsImport.Page />;
        case "export":
            return <toolsExport.Page />;
        case "statistics":
            return <statistics.Page {...props.statisticsVm} />;
    }
}

function getSettingsPage(props: Props): React.ReactElement<any> {
    switch (props.vm.activeSettingsPage) {
        case "settings":
            return <settings.Page />;
        case "about":
            return <about.Page />;
    }
}

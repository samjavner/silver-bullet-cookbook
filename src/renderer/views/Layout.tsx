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
import { CommandProvider } from "../core/commandProvider";
import {
    CalendarPageName,
    HomePageName,
    Navigation,
    RecipesPageName,
    ReferencePageName,
    SettingsPageName,
    ShoppingPageName,
    ToolsPageName,
} from "../core/navigation";
import { RecipeBox } from "../core/recipes/recipeBox";
import { Import } from "../core/tools/import";
import { Statistics } from "../core/tools/statistics";
import CalendarPage from "./calendar/CalendarPage";
import HomePage from "./home/HomePage";
import FavoritesPage from "./recipes/FavoritesPage";
import LibraryPage from "./recipes/LibraryPage";
import RecipeBoxPage from "./recipes/RecipeBoxPage";
import SearchPage from "./recipes/SearchPage";
import TagsPage from "./recipes/TagsPage";
import DictionaryPage from "./reference/Dictionary";
import NutritionPage from "./reference/Nutrition";
import AboutPage from "./settings/AboutPage";
import SettingsPage from "./settings/SettingsPage";
import GroceryListsPage from "./shopping/GroceryListsPage";
import InventoryPage from "./shopping/InventoryPage";
import CalculatorPage from "./tools/CalculatorPage";
import ExportPage from "./tools/ExportPage";
import ImportPage from "./tools/ImportPage";
import StatisticsPage from "./tools/StatisticsPage";
import TimerPage from "./tools/TimerPage";

export interface LayoutProps {
    navigation: Navigation;
    recipeBox: RecipeBox;
    import: Import;
    statistics: Statistics;
    commandProvider: CommandProvider;
}

export const Layout: React.FunctionComponent<LayoutProps> = props => (
    <>
        <NavigationLayout
            navbar={getNavbar(props.navigation)}
            tabs={getTabs(props.navigation)}
            page={getPage(props)}
        />
        {(props.commandProvider.isInProgress || props.import.isImporting) && (
            <div className={"modal is-active"}>
                <div className="modal-background" />
                <div className="modal-content" />
                <button className="modal-close is-large" aria-label="close" />
            </div>
        )}
    </>
);

export default Layout;

// NAVBAR

function getNavbar({ activeArea, setActiveArea }: Navigation): NavbarProps {
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

function getTabs(navigation: Navigation): TabProps[] {
    switch (navigation.activeArea) {
        case "home":
            return getHomeTabs(
                navigation.activeHomePage,
                navigation.setActiveHomePage
            );
        case "recipes":
            return getRecipesTabs(
                navigation.activeRecipesPage,
                navigation.setActiveRecipesPage
            );
        case "calendar":
            return getCalendarTabs(
                navigation.activeCalendarPage,
                navigation.setActiveCalendarPage
            );
        case "shopping":
            return getShoppingTabs(
                navigation.activeShoppingPage,
                navigation.setActiveShoppingPage
            );
        case "reference":
            return getReferenceTabs(
                navigation.activeReferencePage,
                navigation.setActiveReferencePage
            );
        case "tools":
            return getToolsTabs(
                navigation.activeToolsPage,
                navigation.setActiveToolsPage
            );
        case "settings":
            return getSettingsTabs(
                navigation.activeSettingsPage,
                navigation.setActiveSettingsPage
            );
    }
}

function getHomeTabs(
    activePage: HomePageName,
    setActivePage: (page: HomePageName) => void
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
    activePage: RecipesPageName,
    setActivePage: (page: RecipesPageName) => void
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
    activePage: CalendarPageName,
    setActivePage: (page: CalendarPageName) => void
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
    activePage: ShoppingPageName,
    setActivePage: (page: ShoppingPageName) => void
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
    activePage: ReferencePageName,
    setActivePage: (page: ReferencePageName) => void
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
    activePage: ToolsPageName,
    setActivePage: (page: ToolsPageName) => void
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
    activePage: SettingsPageName,
    setActivePage: (page: SettingsPageName) => void
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

function getPage(props: LayoutProps): React.ReactElement<any> {
    switch (props.navigation.activeArea) {
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

function getHomePage(props: LayoutProps): React.ReactElement<any> {
    switch (props.navigation.activeHomePage) {
        case "home":
            return <HomePage />;
    }
}

function getRecipesPage(props: LayoutProps): React.ReactElement<any> {
    switch (props.navigation.activeRecipesPage) {
        case "recipe_box":
            return <RecipeBoxPage recipeBox={props.recipeBox} />;
        case "library":
            return <LibraryPage />;
        case "favorites":
            return <FavoritesPage />;
        case "tags":
            return <TagsPage />;
        case "search":
            return <SearchPage />;
    }
}

function getCalendarPage(props: LayoutProps): React.ReactElement<any> {
    switch (props.navigation.activeCalendarPage) {
        case "calendar":
            return <CalendarPage />;
    }
}

function getShoppingPage(props: LayoutProps): React.ReactElement<any> {
    switch (props.navigation.activeShoppingPage) {
        case "grocery_lists":
            return <GroceryListsPage />;
        case "inventory":
            return <InventoryPage />;
    }
}

function getReferencePage(props: LayoutProps): React.ReactElement<any> {
    switch (props.navigation.activeReferencePage) {
        case "dictionary":
            return <DictionaryPage />;
        case "nutrition":
            return <NutritionPage />;
    }
}

function getToolsPage(props: LayoutProps): React.ReactElement<any> {
    switch (props.navigation.activeToolsPage) {
        case "calculator":
            return <CalculatorPage />;
        case "timer":
            return <TimerPage />;
        case "import":
            return <ImportPage {...props.import} />;
        case "export":
            return <ExportPage />;
        case "statistics":
            return <StatisticsPage {...props.statistics} />;
    }
}

function getSettingsPage(props: LayoutProps): React.ReactElement<any> {
    switch (props.navigation.activeSettingsPage) {
        case "settings":
            return <SettingsPage />;
        case "about":
            return <AboutPage />;
    }
}

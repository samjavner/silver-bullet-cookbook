export interface State {
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

export type CalendarPage = "calendar";

export type ShoppingPage = "grocery_lists" | "inventory";

export type ReferencePage = "dictionary" | "nutrition";

export type ToolsPage =
    | "calculator"
    | "timer"
    | "import"
    | "export"
    | "statistics";

export type SettingsPage = "settings" | "about";

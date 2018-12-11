import * as actions from "./actions";
import {
    Area,
    CalendarPage,
    HomePage,
    moduleName,
    RecipesPage,
    ReferencePage,
    SettingsPage,
    ShoppingPage,
    ToolsPage,
} from "./model";
import { reducer } from "./reducer";
import selectors from "./selectors";

export { actions, moduleName, reducer, selectors };

export type Area = Area;
export type CalendarPage = CalendarPage;
export type HomePage = HomePage;
export type RecipesPage = RecipesPage;
export type ReferencePage = ReferencePage;
export type SettingsPage = SettingsPage;
export type ShoppingPage = ShoppingPage;
export type ToolsPage = ToolsPage;

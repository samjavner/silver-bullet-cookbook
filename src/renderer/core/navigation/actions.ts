import { createStandardAction } from "typesafe-actions";
import {
    Area,
    CalendarPage,
    HomePage,
    RecipesPage,
    ReferencePage,
    SettingsPage,
    ShoppingPage,
    ToolsPage,
} from "./model";

export const setActiveArea = createStandardAction("navigation/SET_ACTIVE_AREA")<
    Area
>();

export const setActiveHomePage = createStandardAction(
    "navigation/SET_ACTIVE_HOME_PAGE"
)<HomePage>();

export const setActiveRecipesPage = createStandardAction(
    "navigation/SET_ACTIVE_RECIPES_PAGE"
)<RecipesPage>();

export const setActiveCalendarPage = createStandardAction(
    "navigation/SET_ACTIVE_CALENDAR_PAGE"
)<CalendarPage>();

export const setActiveShoppingPage = createStandardAction(
    "navigation/SET_ACTIVE_SHOPPING_PAGE"
)<ShoppingPage>();

export const setActiveReferencePage = createStandardAction(
    "navigation/SET_ACTIVE_REFERENCE_PAGE"
)<ReferencePage>();

export const setActiveToolsPage = createStandardAction(
    "navigation/SET_ACTIVE_TOOLS_PAGE"
)<ToolsPage>();

export const setActiveSettingsPage = createStandardAction(
    "navigation/SET_ACTIVE_SETTINGS_PAGE"
)<SettingsPage>();

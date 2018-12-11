import { Reducer } from "redux";
import { ActionType, getType } from "typesafe-actions";
import * as actions from "./actions";
import { State } from "./model";

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

export type Action = ActionType<typeof actions>;

export const reducer: Reducer<State, Action> = (state = init, action) => {
    switch (action.type) {
        case getType(actions.setActiveArea):
            return {
                ...state,
                activeArea: action.payload,
            };
        case getType(actions.setActiveHomePage):
            return {
                ...state,
                activeHomePage: action.payload,
            };
        case getType(actions.setActiveRecipesPage):
            return {
                ...state,
                activeRecipesPage: action.payload,
            };
        case getType(actions.setActiveCalendarPage):
            return {
                ...state,
                activeCalendarPage: action.payload,
            };
        case getType(actions.setActiveShoppingPage):
            return {
                ...state,
                activeShoppingPage: action.payload,
            };
        case getType(actions.setActiveReferencePage):
            return {
                ...state,
                activeReferencePage: action.payload,
            };
        case getType(actions.setActiveToolsPage):
            return {
                ...state,
                activeToolsPage: action.payload,
            };
        case getType(actions.setActiveSettingsPage):
            return {
                ...state,
                activeSettingsPage: action.payload,
            };
    }

    return state;
};

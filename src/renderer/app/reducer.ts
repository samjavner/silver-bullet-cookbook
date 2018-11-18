import { Action } from "./actions";
import { State } from "./state";

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

export default function reducer(state: State = init, action: Action): State {
    switch (action.type) {
        case "setActiveArea":
            return {
                ...state,
                activeArea: action.payload,
            };
        case "setActiveHomePage":
            return {
                ...state,
                activeHomePage: action.payload,
            };
        case "setActiveRecipesPage":
            return {
                ...state,
                activeRecipesPage: action.payload,
            };
        case "setActiveCalendarPage":
            return {
                ...state,
                activeCalendarPage: action.payload,
            };
        case "setActiveShoppingPage":
            return {
                ...state,
                activeShoppingPage: action.payload,
            };
        case "setActiveReferencePage":
            return {
                ...state,
                activeReferencePage: action.payload,
            };
        case "setActiveToolsPage":
            return {
                ...state,
                activeToolsPage: action.payload,
            };
        case "setActiveSettingsPage":
            return {
                ...state,
                activeSettingsPage: action.payload,
            };
    }

    return state;
}

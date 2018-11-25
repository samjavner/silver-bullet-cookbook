import * as actions from "./actions";

describe("actions", () => {
    it("should create an action to set the active area", () => {
        const actual = actions.setActiveArea("reference");
        const expected: actions.Action = {
            type: "setActiveArea",
            payload: "reference",
        };
        expect(actual).toEqual(expected);
    });

    it("should create an action to set the active home page", () => {
        const actual = actions.setActiveHomePage("home");
        const expected: actions.Action = {
            type: "setActiveHomePage",
            payload: "home",
        };
        expect(actual).toEqual(expected);
    });

    it("should create an action to set the active recipes page", () => {
        const actual = actions.setActiveRecipesPage("library");
        const expected: actions.Action = {
            type: "setActiveRecipesPage",
            payload: "library",
        };
        expect(actual).toEqual(expected);
    });

    it("should create an action to set the active calendar page", () => {
        const actual = actions.setActiveCalendarPage("calendar");
        const expected: actions.Action = {
            type: "setActiveCalendarPage",
            payload: "calendar",
        };
        expect(actual).toEqual(expected);
    });

    it("should create an action to set the active shopping page", () => {
        const actual = actions.setActiveShoppingPage("grocery_lists");
        const expected: actions.Action = {
            type: "setActiveShoppingPage",
            payload: "grocery_lists",
        };
        expect(actual).toEqual(expected);
    });

    it("should create an action to set the active reference page", () => {
        const actual = actions.setActiveReferencePage("dictionary");
        const expected: actions.Action = {
            type: "setActiveReferencePage",
            payload: "dictionary",
        };
        expect(actual).toEqual(expected);
    });

    it("should create an action to set the active tools page", () => {
        const actual = actions.setActiveToolsPage("calculator");
        const expected: actions.Action = {
            type: "setActiveToolsPage",
            payload: "calculator",
        };
        expect(actual).toEqual(expected);
    });

    it("should create an action to set the active settings page", () => {
        const actual = actions.setActiveSettingsPage("settings");
        const expected: actions.Action = {
            type: "setActiveSettingsPage",
            payload: "settings",
        };
        expect(actual).toEqual(expected);
    });

    it("should create an action to set the selected recipe index", () => {
        const actual = actions.setSelectedRecipeIndex(100);
        const expected: actions.Action = {
            type: "setSelectedRecipeIndex",
            payload: 100,
        };
        expect(actual).toEqual(expected);
    });
});

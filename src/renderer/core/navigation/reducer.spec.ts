import * as actions from "./actions";
import { State } from "./model";
import { reducer } from "./reducer";

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

describe("reducer", () => {
    it("should return the initial state", () => {
        const actual = reducer(undefined, {} as any);
        expect(actual).toEqual(init);
    });

    it("should set the active area", () => {
        const action = actions.setActiveArea("home");
        const actual = reducer(
            {
                ...init,
                activeArea: "foo" as any,
            },
            action
        );
        const expected: State = {
            ...init,
            activeArea: "home",
        };
        expect(actual).toEqual(expected);
    });

    it("should set the active home page", () => {
        const action = actions.setActiveHomePage("home");
        const actual = reducer(
            {
                ...init,
                activeHomePage: "foo" as any,
            },
            action
        );
        const expected: State = {
            ...init,
            activeHomePage: "home",
        };
        expect(actual).toEqual(expected);
    });

    it("should set the active recipes page", () => {
        const action = actions.setActiveRecipesPage("recipe_box");
        const actual = reducer(
            {
                ...init,
                activeRecipesPage: "foo" as any,
            },
            action
        );
        const expected: State = {
            ...init,
            activeRecipesPage: "recipe_box",
        };
        expect(actual).toEqual(expected);
    });

    it("should set the active calendar page", () => {
        const action = actions.setActiveCalendarPage("calendar");
        const actual = reducer(
            {
                ...init,
                activeCalendarPage: "foo" as any,
            },
            action
        );
        const expected: State = {
            ...init,
            activeCalendarPage: "calendar",
        };
        expect(actual).toEqual(expected);
    });

    it("should set the active shopping page", () => {
        const action = actions.setActiveShoppingPage("grocery_lists");
        const actual = reducer(
            {
                ...init,
                activeShoppingPage: "foo" as any,
            },
            action
        );
        const expected: State = {
            ...init,
            activeShoppingPage: "grocery_lists",
        };
        expect(actual).toEqual(expected);
    });

    it("should set the active reference page", () => {
        const action = actions.setActiveReferencePage("dictionary");
        const actual = reducer(
            {
                ...init,
                activeReferencePage: "foo" as any,
            },
            action
        );
        const expected: State = {
            ...init,
            activeReferencePage: "dictionary",
        };
        expect(actual).toEqual(expected);
    });

    it("should set the active tools page", () => {
        const action = actions.setActiveToolsPage("calculator");
        const actual = reducer(
            {
                ...init,
                activeToolsPage: "foo" as any,
            },
            action
        );
        const expected: State = {
            ...init,
            activeToolsPage: "calculator",
        };
        expect(actual).toEqual(expected);
    });

    it("should set the active settings page", () => {
        const action = actions.setActiveSettingsPage("settings");
        const actual = reducer(
            {
                ...init,
                activeSettingsPage: "foo" as any,
            },
            action
        );
        const expected: State = {
            ...init,
            activeSettingsPage: "settings",
        };
        expect(actual).toEqual(expected);
    });
});

import reducer from "./reducer";
import { State } from "./state";

describe("reducer", () => {
    let initialState: State;

    beforeEach(() => {
        initialState = reducer(undefined, {} as any);
    });

    it("should return the initial state", () => {
        const actual = initialState;
        const expected: State = {
            activeArea: "home",
            activeHomePage: "home",
            activeRecipesPage: "recipe_box",
            activeCalendarPage: "calendar",
            activeShoppingPage: "grocery_lists",
            activeReferencePage: "dictionary",
            activeToolsPage: "calculator",
            activeSettingsPage: "settings",
        };
        expect(actual).toEqual(expected);
    });

    it("should set the active area", () => {
        initialState = {
            ...initialState,
            activeArea: "foo" as any,
        };
        const actual = reducer(initialState, {
            type: "setActiveArea",
            payload: "home",
        });
        const expected: State = {
            ...initialState,
            activeArea: "home",
        };
        expect(actual).toEqual(expected);
    });

    it("should set the active home page", () => {
        initialState = {
            ...initialState,
            activeHomePage: "foo" as any,
        };
        const actual = reducer(initialState, {
            type: "setActiveHomePage",
            payload: "home",
        });
        const expected: State = {
            ...initialState,
            activeHomePage: "home",
        };
        expect(actual).toEqual(expected);
    });

    it("should set the active recipes page", () => {
        initialState = {
            ...initialState,
            activeRecipesPage: "foo" as any,
        };
        const actual = reducer(initialState, {
            type: "setActiveRecipesPage",
            payload: "library",
        });
        const expected: State = {
            ...initialState,
            activeRecipesPage: "library",
        };
        expect(actual).toEqual(expected);
    });

    it("should set the active calendar page", () => {
        initialState = {
            ...initialState,
            activeCalendarPage: "foo" as any,
        };
        const actual = reducer(initialState, {
            type: "setActiveCalendarPage",
            payload: "calendar",
        });
        const expected: State = {
            ...initialState,
            activeCalendarPage: "calendar",
        };
        expect(actual).toEqual(expected);
    });

    it("should set the active shopping page", () => {
        initialState = {
            ...initialState,
            activeShoppingPage: "foo" as any,
        };
        const actual = reducer(initialState, {
            type: "setActiveShoppingPage",
            payload: "grocery_lists",
        });
        const expected: State = {
            ...initialState,
            activeShoppingPage: "grocery_lists",
        };
        expect(actual).toEqual(expected);
    });

    it("should set the active reference page", () => {
        initialState = {
            ...initialState,
            activeReferencePage: "foo" as any,
        };
        const actual = reducer(initialState, {
            type: "setActiveReferencePage",
            payload: "dictionary",
        });
        const expected: State = {
            ...initialState,
            activeReferencePage: "dictionary",
        };
        expect(actual).toEqual(expected);
    });

    it("should set the active tools page", () => {
        initialState = {
            ...initialState,
            activeToolsPage: "foo" as any,
        };
        const actual = reducer(initialState, {
            type: "setActiveToolsPage",
            payload: "calculator",
        });
        const expected: State = {
            ...initialState,
            activeToolsPage: "calculator",
        };
        expect(actual).toEqual(expected);
    });

    it("should set the active settings page", () => {
        initialState = {
            ...initialState,
            activeSettingsPage: "foo" as any,
        };
        const actual = reducer(initialState, {
            type: "setActiveSettingsPage",
            payload: "settings",
        });
        const expected: State = {
            ...initialState,
            activeSettingsPage: "settings",
        };
        expect(actual).toEqual(expected);
    });
});

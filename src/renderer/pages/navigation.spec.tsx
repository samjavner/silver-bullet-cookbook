import * as React from "react";
import * as renderer from "react-test-renderer";
import * as navigation from "./navigation";

describe("navigation", () => {
    describe("update", () => {
        it("should update activeArea", () => {
            const actual = navigation.update.setActiveArea(
                { ...navigation.init, activeArea: "settings" },
                "home"
            );
            const expected: navigation.Model = {
                ...navigation.init,
                activeArea: "home",
            };
            expect(actual).toEqual(expected);
        });

        it("should update activeHomePage", () => {
            const actual = navigation.update.setActiveHomePage(
                { ...navigation.init, activeHomePage: "foo" as any },
                "home"
            );
            const expected: navigation.Model = {
                ...navigation.init,
                activeHomePage: "home",
            };
            expect(actual).toEqual(expected);
        });

        it("should update activeRecipesPage", () => {
            const actual = navigation.update.setActiveRecipesPage(
                { ...navigation.init, activeRecipesPage: "search" },
                "recipe_box"
            );
            const expected: navigation.Model = {
                ...navigation.init,
                activeRecipesPage: "recipe_box",
            };
            expect(actual).toEqual(expected);
        });

        it("should update activeCalendarPage", () => {
            const actual = navigation.update.setActiveCalendarPage(
                { ...navigation.init, activeCalendarPage: "foo" as any },
                "calendar"
            );
            const expected: navigation.Model = {
                ...navigation.init,
                activeCalendarPage: "calendar",
            };
            expect(actual).toEqual(expected);
        });

        it("should update activeShoppingPage", () => {
            const actual = navigation.update.setActiveShoppingPage(
                { ...navigation.init, activeShoppingPage: "inventory" },
                "grocery_lists"
            );
            const expected: navigation.Model = {
                ...navigation.init,
                activeShoppingPage: "grocery_lists",
            };
            expect(actual).toEqual(expected);
        });

        it("should update activeReferencePage", () => {
            const actual = navigation.update.setActiveReferencePage(
                { ...navigation.init, activeReferencePage: "nutrition" },
                "dictionary"
            );
            const expected: navigation.Model = {
                ...navigation.init,
                activeReferencePage: "dictionary",
            };
            expect(actual).toEqual(expected);
        });

        it("should update activeToolsPage", () => {
            const actual = navigation.update.setActiveToolsPage(
                { ...navigation.init, activeToolsPage: "statistics" },
                "calculator"
            );
            const expected: navigation.Model = {
                ...navigation.init,
                activeToolsPage: "calculator",
            };
            expect(actual).toEqual(expected);
        });

        it("should update activeSettingsPage", () => {
            const actual = navigation.update.setActiveSettingsPage(
                { ...navigation.init, activeSettingsPage: "about" },
                "settings"
            );
            const expected: navigation.Model = {
                ...navigation.init,
                activeSettingsPage: "settings",
            };
            expect(actual).toEqual(expected);
        });
    });

    describe("Navigation", () => {
        it("renders the navbar, tabs, and active page", () => {
            const component = renderer.create(
                <navigation.Navigation
                    vm={{
                        ...navigation.init,
                        setActiveArea: () => ({}),
                        setActiveHomePage: () => ({}),
                        setActiveRecipesPage: () => ({}),
                        setActiveCalendarPage: () => ({}),
                        setActiveShoppingPage: () => ({}),
                        setActiveReferencePage: () => ({}),
                        setActiveToolsPage: () => ({}),
                        setActiveSettingsPage: () => ({}),
                    }}
                    recipeBoxVm={{} as any}
                    statisticsVm={{} as any}
                />
            );
            const tree = component.toJSON();
            expect(tree).toMatchSnapshot();
        });
    });
});

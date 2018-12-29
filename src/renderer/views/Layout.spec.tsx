import * as React from "react";
import * as renderer from "react-test-renderer";
import * as Model from "../core/navigation";
import { Layout, LayoutProps } from "./Layout";

describe("Layout", () => {
    let props: LayoutProps;

    beforeEach(() => {
        props = {
            navigation: {
                ...Model.init,
                setActiveArea: () => ({}),
                setActiveHomePage: () => ({}),
                setActiveRecipesPage: () => ({}),
                setActiveCalendarPage: () => ({}),
                setActiveShoppingPage: () => ({}),
                setActiveReferencePage: () => ({}),
                setActiveToolsPage: () => ({}),
                setActiveSettingsPage: () => ({}),
            },
            commandProvider: {
                isInProgress: false,
            } as any,
            recipeBox: {} as any,
            import: {
                isImporting: false,
            } as any,
            statistics: {} as any,
        };
    });

    it("renders the navbar, tabs, and active page", () => {
        const component = renderer.create(<Layout {...props} />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    describe("loading overlay", () => {
        it("should be there when commandProvider is executing", () => {
            props.commandProvider.isInProgress = true;
            const component = renderer.create(<Layout {...props} />);
            const tree = component.toJSON();
            expect(tree).toMatchSnapshot();
        });

        it("should be there when importing recipes", () => {
            props.import.isImporting = true;
            const component = renderer.create(<Layout {...props} />);
            const tree = component.toJSON();
            expect(tree).toMatchSnapshot();
        });
    });
});

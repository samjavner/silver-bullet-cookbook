import * as React from "react";
import * as renderer from "react-test-renderer";
import { AppNavbar } from "./AppNavbar";

describe("AppNavbar", () => {
    const onHomeClick = () => ({} as any);
    const onRecipesClick = () => ({} as any);
    const onCalendarClick = () => ({} as any);
    const onShoppingClick = () => ({} as any);
    const onReferenceClick = () => ({} as any);
    const onToolsClick = () => ({} as any);
    const onSettingsClick = () => ({} as any);

    it("should render with 'home' active when the 'home' area is active", () => {
        const component = renderer.create(
            <AppNavbar
                activeArea="home"
                onHomeClick={onHomeClick}
                onRecipesClick={onRecipesClick}
                onCalendarClick={onCalendarClick}
                onShoppingClick={onShoppingClick}
                onReferenceClick={onReferenceClick}
                onToolsClick={onToolsClick}
                onSettingsClick={onSettingsClick}
            />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("should render with 'recipes' active when the 'recipes' area is active", () => {
        const component = renderer.create(
            <AppNavbar
                activeArea="recipes"
                onHomeClick={onHomeClick}
                onRecipesClick={onRecipesClick}
                onCalendarClick={onCalendarClick}
                onShoppingClick={onShoppingClick}
                onReferenceClick={onReferenceClick}
                onToolsClick={onToolsClick}
                onSettingsClick={onSettingsClick}
            />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("should render with 'calendar' active when the 'calendar' area is active", () => {
        const component = renderer.create(
            <AppNavbar
                activeArea="calendar"
                onHomeClick={onHomeClick}
                onRecipesClick={onRecipesClick}
                onCalendarClick={onCalendarClick}
                onShoppingClick={onShoppingClick}
                onReferenceClick={onReferenceClick}
                onToolsClick={onToolsClick}
                onSettingsClick={onSettingsClick}
            />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("should render with 'shopping' active when the 'shopping' area is active", () => {
        const component = renderer.create(
            <AppNavbar
                activeArea="shopping"
                onHomeClick={onHomeClick}
                onRecipesClick={onRecipesClick}
                onCalendarClick={onCalendarClick}
                onShoppingClick={onShoppingClick}
                onReferenceClick={onReferenceClick}
                onToolsClick={onToolsClick}
                onSettingsClick={onSettingsClick}
            />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("should render with 'reference' active when the 'reference' area is active", () => {
        const component = renderer.create(
            <AppNavbar
                activeArea="reference"
                onHomeClick={onHomeClick}
                onRecipesClick={onRecipesClick}
                onCalendarClick={onCalendarClick}
                onShoppingClick={onShoppingClick}
                onReferenceClick={onReferenceClick}
                onToolsClick={onToolsClick}
                onSettingsClick={onSettingsClick}
            />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("should render with 'tools' active when the 'tools' area is active", () => {
        const component = renderer.create(
            <AppNavbar
                activeArea="tools"
                onHomeClick={onHomeClick}
                onRecipesClick={onRecipesClick}
                onCalendarClick={onCalendarClick}
                onShoppingClick={onShoppingClick}
                onReferenceClick={onReferenceClick}
                onToolsClick={onToolsClick}
                onSettingsClick={onSettingsClick}
            />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("should render with 'settings' active when the 'settings' area is active", () => {
        const component = renderer.create(
            <AppNavbar
                activeArea="settings"
                onHomeClick={onHomeClick}
                onRecipesClick={onRecipesClick}
                onCalendarClick={onCalendarClick}
                onShoppingClick={onShoppingClick}
                onReferenceClick={onReferenceClick}
                onToolsClick={onToolsClick}
                onSettingsClick={onSettingsClick}
            />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("should handle click on 'home' tab", () => {
        const component = renderer.create(
            <AppNavbar
                activeArea="home"
                onHomeClick={onHomeClick}
                onRecipesClick={onRecipesClick}
                onCalendarClick={onCalendarClick}
                onShoppingClick={onShoppingClick}
                onReferenceClick={onReferenceClick}
                onToolsClick={onToolsClick}
                onSettingsClick={onSettingsClick}
            />
        );
        const button = component.root.find(
            node =>
                node.props.className &&
                node.props.className.indexOf("pz-navbar-button--active") !== -1
        );
        expect(button.props.onClick).toBe(onHomeClick);
    });

    it("should handle click on 'recipes' tab", () => {
        const component = renderer.create(
            <AppNavbar
                activeArea="recipes"
                onHomeClick={onHomeClick}
                onRecipesClick={onRecipesClick}
                onCalendarClick={onCalendarClick}
                onShoppingClick={onShoppingClick}
                onReferenceClick={onReferenceClick}
                onToolsClick={onToolsClick}
                onSettingsClick={onSettingsClick}
            />
        );
        const button = component.root.find(
            node =>
                node.props.className &&
                node.props.className.indexOf("pz-navbar-button--active") !== -1
        );
        expect(button.props.onClick).toBe(onRecipesClick);
    });

    it("should handle click on 'calendar' tab", () => {
        const component = renderer.create(
            <AppNavbar
                activeArea="calendar"
                onHomeClick={onHomeClick}
                onRecipesClick={onRecipesClick}
                onCalendarClick={onCalendarClick}
                onShoppingClick={onShoppingClick}
                onReferenceClick={onReferenceClick}
                onToolsClick={onToolsClick}
                onSettingsClick={onSettingsClick}
            />
        );
        const button = component.root.find(
            node =>
                node.props.className &&
                node.props.className.indexOf("pz-navbar-button--active") !== -1
        );
        expect(button.props.onClick).toBe(onCalendarClick);
    });

    it("should handle click on 'shopping' tab", () => {
        const component = renderer.create(
            <AppNavbar
                activeArea="shopping"
                onHomeClick={onHomeClick}
                onRecipesClick={onRecipesClick}
                onCalendarClick={onCalendarClick}
                onShoppingClick={onShoppingClick}
                onReferenceClick={onReferenceClick}
                onToolsClick={onToolsClick}
                onSettingsClick={onSettingsClick}
            />
        );
        const button = component.root.find(
            node =>
                node.props.className &&
                node.props.className.indexOf("pz-navbar-button--active") !== -1
        );
        expect(button.props.onClick).toBe(onShoppingClick);
    });

    it("should handle click on 'reference' tab", () => {
        const component = renderer.create(
            <AppNavbar
                activeArea="reference"
                onHomeClick={onHomeClick}
                onRecipesClick={onRecipesClick}
                onCalendarClick={onCalendarClick}
                onShoppingClick={onShoppingClick}
                onReferenceClick={onReferenceClick}
                onToolsClick={onToolsClick}
                onSettingsClick={onSettingsClick}
            />
        );
        const button = component.root.find(
            node =>
                node.props.className &&
                node.props.className.indexOf("pz-navbar-button--active") !== -1
        );
        expect(button.props.onClick).toBe(onReferenceClick);
    });

    it("should handle click on 'tools' tab", () => {
        const component = renderer.create(
            <AppNavbar
                activeArea="tools"
                onHomeClick={onHomeClick}
                onRecipesClick={onRecipesClick}
                onCalendarClick={onCalendarClick}
                onShoppingClick={onShoppingClick}
                onReferenceClick={onReferenceClick}
                onToolsClick={onToolsClick}
                onSettingsClick={onSettingsClick}
            />
        );
        const button = component.root.find(
            node =>
                node.props.className &&
                node.props.className.indexOf("pz-navbar-button--active") !== -1
        );
        expect(button.props.onClick).toBe(onToolsClick);
    });

    it("should handle click on 'settings' tab", () => {
        const component = renderer.create(
            <AppNavbar
                activeArea="settings"
                onHomeClick={onHomeClick}
                onRecipesClick={onRecipesClick}
                onCalendarClick={onCalendarClick}
                onShoppingClick={onShoppingClick}
                onReferenceClick={onReferenceClick}
                onToolsClick={onToolsClick}
                onSettingsClick={onSettingsClick}
            />
        );
        const button = component.root.find(
            node =>
                node.props.className &&
                node.props.className.indexOf("pz-navbar-button--active") !== -1
        );
        expect(button.props.onClick).toBe(onSettingsClick);
    });
});

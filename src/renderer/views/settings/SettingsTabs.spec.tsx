import * as React from "react";
import * as renderer from "react-test-renderer";
import { SettingsTabs } from "./SettingsTabs";

describe("SettingsTabs", () => {
    const onSettingsClick = () => ({} as any);
    const onAboutClick = () => ({} as any);

    it("should render with the 'settings' tab active when the 'settings' page is active", () => {
        const component = renderer.create(
            <SettingsTabs
                activePage="settings"
                onSettingsClick={onSettingsClick}
                onAboutClick={onAboutClick}
            />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("should render with the 'about' tab active when the 'about' page is active", () => {
        const component = renderer.create(
            <SettingsTabs
                activePage="about"
                onSettingsClick={onSettingsClick}
                onAboutClick={onAboutClick}
            />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("should handle click on 'settings' tab", () => {
        const component = renderer.create(
            <SettingsTabs
                activePage="settings"
                onSettingsClick={onSettingsClick}
                onAboutClick={onAboutClick}
            />
        );
        const button = component.root.find(
            node =>
                node.props.className &&
                node.props.className.indexOf("pz-navtabs-button--active") !== -1
        );
        expect(button.props.onClick).toBe(onSettingsClick);
    });

    it("should handle click on 'about' tab", () => {
        const component = renderer.create(
            <SettingsTabs
                activePage="about"
                onSettingsClick={onSettingsClick}
                onAboutClick={onAboutClick}
            />
        );
        const button = component.root.find(
            node =>
                node.props.className &&
                node.props.className.indexOf("pz-navtabs-button--active") !== -1
        );
        expect(button.props.onClick).toBe(onAboutClick);
    });
});

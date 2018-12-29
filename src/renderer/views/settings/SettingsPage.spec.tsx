import * as React from "react";
import * as renderer from "react-test-renderer";
import { SettingsPage } from "./SettingsPage";

describe("SettingsPage", () => {
    it("renders the text 'Settings'", () => {
        const component = renderer.create(<SettingsPage />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

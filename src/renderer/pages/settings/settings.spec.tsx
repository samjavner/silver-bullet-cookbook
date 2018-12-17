import * as React from "react";
import * as renderer from "react-test-renderer";
import * as settings from "./settings";

describe("settings", () => {
    describe("Page", () => {
        it("renders the text 'Settings'", () => {
            const component = renderer.create(<settings.Page />);
            const tree = component.toJSON();
            expect(tree).toMatchSnapshot();
        });
    });
});

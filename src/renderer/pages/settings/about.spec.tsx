import * as React from "react";
import * as renderer from "react-test-renderer";
import * as about from "./about";

describe("about", () => {
    describe("Page", () => {
        it("renders the text 'About'", () => {
            const component = renderer.create(<about.Page />);
            const tree = component.toJSON();
            expect(tree).toMatchSnapshot();
        });
    });
});

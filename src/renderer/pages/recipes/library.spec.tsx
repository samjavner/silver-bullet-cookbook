import * as React from "react";
import * as renderer from "react-test-renderer";
import * as library from "./library";

describe("library", () => {
    describe("Page", () => {
        it("renders the text 'Library'", () => {
            const component = renderer.create(<library.Page />);
            const tree = component.toJSON();
            expect(tree).toMatchSnapshot();
        });
    });
});

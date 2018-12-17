import * as React from "react";
import * as renderer from "react-test-renderer";
import * as home from "./home";

describe("home", () => {
    describe("Page", () => {
        it("renders the text 'Home'", () => {
            const component = renderer.create(<home.Page />);
            const tree = component.toJSON();
            expect(tree).toMatchSnapshot();
        });
    });
});

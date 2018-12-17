import * as React from "react";
import * as renderer from "react-test-renderer";
import * as search from "./search";

describe("search", () => {
    describe("Page", () => {
        it("renders the text 'Search'", () => {
            const component = renderer.create(<search.Page />);
            const tree = component.toJSON();
            expect(tree).toMatchSnapshot();
        });
    });
});

import * as React from "react";
import * as renderer from "react-test-renderer";
import * as search from "./SearchPage";

describe("SearchPage", () => {
    it("renders the text 'Search'", () => {
        const component = renderer.create(<search.SearchPage />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

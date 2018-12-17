import * as React from "react";
import * as renderer from "react-test-renderer";
import * as favorites from "./favorites";

describe("favorites", () => {
    describe("Page", () => {
        it("renders the text 'Favorites'", () => {
            const component = renderer.create(<favorites.Page />);
            const tree = component.toJSON();
            expect(tree).toMatchSnapshot();
        });
    });
});

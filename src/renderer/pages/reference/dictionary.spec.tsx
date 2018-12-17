import * as React from "react";
import * as renderer from "react-test-renderer";
import * as dictionary from "./dictionary";

describe("dictionary", () => {
    describe("Page", () => {
        it("renders the text 'Dictionary'", () => {
            const component = renderer.create(<dictionary.Page />);
            const tree = component.toJSON();
            expect(tree).toMatchSnapshot();
        });
    });
});

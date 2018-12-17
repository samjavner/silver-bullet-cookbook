import * as React from "react";
import * as renderer from "react-test-renderer";
import * as nutrition from "./nutrition";

describe("nutrition", () => {
    describe("Page", () => {
        it("renders the text 'Nutrition'", () => {
            const component = renderer.create(<nutrition.Page />);
            const tree = component.toJSON();
            expect(tree).toMatchSnapshot();
        });
    });
});

import * as React from "react";
import * as renderer from "react-test-renderer";
import * as inventory from "./inventory";

describe("inventory", () => {
    describe("Page", () => {
        it("renders the text 'Inventory'", () => {
            const component = renderer.create(<inventory.Page />);
            const tree = component.toJSON();
            expect(tree).toMatchSnapshot();
        });
    });
});

import * as React from "react";
import * as renderer from "react-test-renderer";
import * as groceryLists from "./groceryLists";

describe("groceryLists", () => {
    describe("Page", () => {
        it("renders the text 'GroceryLists'", () => {
            const component = renderer.create(<groceryLists.Page />);
            const tree = component.toJSON();
            expect(tree).toMatchSnapshot();
        });
    });
});

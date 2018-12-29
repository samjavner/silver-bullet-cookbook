import * as React from "react";
import * as renderer from "react-test-renderer";
import { GroceryListsPage } from "./GroceryListsPage";

describe("GroceryListsPage", () => {
    it("renders the text 'GroceryLists'", () => {
        const component = renderer.create(<GroceryListsPage />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

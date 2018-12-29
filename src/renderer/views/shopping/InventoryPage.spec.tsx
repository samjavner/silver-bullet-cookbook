import * as React from "react";
import * as renderer from "react-test-renderer";
import { InventoryPage } from "./InventoryPage";

describe("InventoryPage", () => {
    it("renders the text 'Inventory'", () => {
        const component = renderer.create(<InventoryPage />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

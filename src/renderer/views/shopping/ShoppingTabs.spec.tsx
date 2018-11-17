import * as React from "react";
import * as renderer from "react-test-renderer";
import { ShoppingTabs } from "./ShoppingTabs";

describe("ShoppingTabs", () => {
    const onGroceryListsClick = () => ({} as any);
    const onInventoryClick = () => ({} as any);

    it("should render with the 'grocery_lists' tab active when the 'grocery_lists' page is active", () => {
        const component = renderer.create(
            <ShoppingTabs
                activePage="grocery_lists"
                onGroceryListsClick={onGroceryListsClick}
                onInventoryClick={onInventoryClick}
            />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("should render with the 'inventory' tab active when the 'inventory' page is active", () => {
        const component = renderer.create(
            <ShoppingTabs
                activePage="inventory"
                onGroceryListsClick={onGroceryListsClick}
                onInventoryClick={onInventoryClick}
            />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("should handle click on 'grocery_lists' tab", () => {
        const component = renderer.create(
            <ShoppingTabs
                activePage="grocery_lists"
                onGroceryListsClick={onGroceryListsClick}
                onInventoryClick={onInventoryClick}
            />
        );
        const button = component.root.find(
            node =>
                node.props.className &&
                node.props.className.indexOf("is-active") !== -1
        ).children[0] as renderer.ReactTestInstance;
        expect(button.props.onClick).toBe(onGroceryListsClick);
    });

    it("should handle click on 'inventory' tab", () => {
        const component = renderer.create(
            <ShoppingTabs
                activePage="inventory"
                onGroceryListsClick={onGroceryListsClick}
                onInventoryClick={onInventoryClick}
            />
        );
        const button = component.root.find(
            node =>
                node.props.className &&
                node.props.className.indexOf("is-active") !== -1
        ).children[0] as renderer.ReactTestInstance;
        expect(button.props.onClick).toBe(onInventoryClick);
    });
});

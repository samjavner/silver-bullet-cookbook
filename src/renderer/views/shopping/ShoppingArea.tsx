import * as React from "react";
import { connect } from "react-redux";
import { GlobalState } from "../../core/model";
import * as navigation from "../../core/navigation";
import GroceryListsPage from "./groceryLists/GroceryListsPage";
import InventoryPage from "./inventory/InventoryPage";
import ShoppingTabs from "./ShoppingTabs";

interface ShoppingAreaProps {
    activePage: navigation.ShoppingPage;
}

const ShoppingArea: React.SFC<ShoppingAreaProps> = props => (
    <>
        <ShoppingTabs />
        {props.activePage === "grocery_lists" && <GroceryListsPage />}
        {props.activePage === "inventory" && <InventoryPage />}
    </>
);

const mapStateToProps = (state: GlobalState) => ({
    activePage: navigation.selectors.getActiveShoppingPage(state),
});

export default connect(mapStateToProps)(ShoppingArea);

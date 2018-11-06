import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import * as actions from "../../app/actions";
import { State } from "../../app/state";
import GroceryListsPage from "./groceryLists/GroceryListsPage";
import InventoryPage from "./inventory/InventoryPage";
import ShoppingTabs from "./ShoppingTabs";

function mapStateToProps(state: State) {
    return {
        activePage: state.activeShoppingPage,
    };
}

function mapDispatchToProps(dispatch: Dispatch<actions.Action>) {
    return {};
}

type ShoppingAreaProps = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>;

const ShoppingArea: React.SFC<ShoppingAreaProps> = props => (
    <>
        <ShoppingTabs />
        {props.activePage === "grocery_lists" && <GroceryListsPage />}
        {props.activePage === "inventory" && <InventoryPage />}
    </>
);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShoppingArea);

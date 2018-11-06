import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import * as actions from "../../app/actions";
import { State } from "../../app/state";
import { Navtab, Navtabs } from "../../components/Navtabs";

function mapStateToProps(state: State) {
    return {
        activePage: state.activeShoppingPage,
    };
}

function mapDispatchToProps(dispatch: Dispatch<actions.Action>) {
    return {
        onGroceryListsClick: () =>
            dispatch(actions.setActiveShoppingPage("grocery_lists")),
        onInventoryClick: () =>
            dispatch(actions.setActiveShoppingPage("inventory")),
    };
}

type ShoppingTabsProps = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>;

export const ShoppingTabs: React.SFC<ShoppingTabsProps> = props => (
    <Navtabs>
        <Navtab
            isActive={props.activePage === "grocery_lists"}
            icon="shopping-cart"
            text="Grocery Lists"
            onClick={props.onGroceryListsClick}
        />
        <Navtab
            isActive={props.activePage === "inventory"}
            icon="inbox"
            text="Inventory"
            onClick={props.onInventoryClick}
        />
    </Navtabs>
);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShoppingTabs);

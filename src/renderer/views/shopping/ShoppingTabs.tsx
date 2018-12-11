import { faBox, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { Navtab, Navtabs } from "../../components/Navtabs";
import { GlobalState } from "../../core/model";
import * as navigation from "../../core/navigation";

interface ShoppingTabsProps {
    activePage: navigation.ShoppingPage;
    onGroceryListsClick: () => void;
    onInventoryClick: () => void;
}

export const ShoppingTabs: React.SFC<ShoppingTabsProps> = props => (
    <Navtabs>
        <Navtab
            isActive={props.activePage === "grocery_lists"}
            icon={faShoppingCart}
            text="Grocery Lists"
            onClick={props.onGroceryListsClick}
        />
        <Navtab
            isActive={props.activePage === "inventory"}
            icon={faBox}
            text="Inventory"
            onClick={props.onInventoryClick}
        />
    </Navtabs>
);

const mapStateToProps = (state: GlobalState) => ({
    activePage: navigation.selectors.getActiveShoppingPage(state),
});

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            onGroceryListsClick: () =>
                navigation.actions.setActiveShoppingPage("grocery_lists"),
            onInventoryClick: () =>
                navigation.actions.setActiveShoppingPage("inventory"),
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShoppingTabs);

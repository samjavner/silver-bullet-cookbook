import { Button, ButtonGroup } from "@blueprintjs/core";
import classNames from "classnames";
import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import * as actions from "../../app/actions";
import { State } from "../../app/state";

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
    <>
        <div className="pz-navtabs">
            <ButtonGroup minimal={true}>
                <Button
                    className={classNames({
                        "pz-navtabs-button": true,
                        "pz-navtabs-button--active":
                            props.activePage === "grocery_lists",
                    })}
                    icon="shopping-cart"
                    onClick={props.onGroceryListsClick}
                >
                    Grocery Lists
                </Button>
                <Button
                    className={classNames({
                        "pz-navtabs-button": true,
                        "pz-navtabs-button--active":
                            props.activePage === "inventory",
                    })}
                    icon="inbox"
                    onClick={props.onInventoryClick}
                >
                    Inventory
                </Button>
            </ButtonGroup>
        </div>
        <div style={{ borderTop: "1px solid lightgray" }} />
    </>
);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShoppingTabs);

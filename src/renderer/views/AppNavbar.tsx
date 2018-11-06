import { Button, Navbar } from "@blueprintjs/core";
import classNames from "classnames";
import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import * as actions from "../app/actions";
import { State } from "../app/state";

function mapStateToProps(state: State) {
    return {
        activeArea: state.activeArea,
    };
}

function mapDispatchToProps(dispatch: Dispatch<actions.Action>) {
    return {
        onHomeClick: () => dispatch(actions.setActiveArea("home")),
        onRecipesClick: () => dispatch(actions.setActiveArea("recipes")),
        onCalendarClick: () => dispatch(actions.setActiveArea("calendar")),
        onShoppingClick: () => dispatch(actions.setActiveArea("shopping")),
        onReferenceClick: () => dispatch(actions.setActiveArea("reference")),
        onToolsClick: () => dispatch(actions.setActiveArea("tools")),
        onSettingsClick: () => dispatch(actions.setActiveArea("settings")),
    };
}

type AppNavbarProps = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>;

export const AppNavbar: React.SFC<AppNavbarProps> = props => (
    <Navbar className="pz-navbar">
        <Navbar.Group>
            <Button
                minimal={true}
                className={classNames({
                    "pz-navbar-button": true,
                    "pz-navbar-button--active": props.activeArea === "home",
                })}
                onClick={props.onHomeClick}
                icon="home"
            />
            <Button
                minimal={true}
                className={classNames({
                    "pz-navbar-button": true,
                    "pz-navbar-button--active": props.activeArea === "recipes",
                })}
                onClick={props.onRecipesClick}
            >
                Recipes
            </Button>
            <Button
                minimal={true}
                className={classNames({
                    "pz-navbar-button": true,
                    "pz-navbar-button--active": props.activeArea === "calendar",
                })}
                onClick={props.onCalendarClick}
            >
                Calendar
            </Button>
            <Button
                minimal={true}
                className={classNames({
                    "pz-navbar-button": true,
                    "pz-navbar-button--active": props.activeArea === "shopping",
                })}
                onClick={props.onShoppingClick}
            >
                Shopping
            </Button>
            <Button
                minimal={true}
                className={classNames({
                    "pz-navbar-button": true,
                    "pz-navbar-button--active":
                        props.activeArea === "reference",
                })}
                onClick={props.onReferenceClick}
            >
                Reference
            </Button>
            <Button
                minimal={true}
                className={classNames({
                    "pz-navbar-button": true,
                    "pz-navbar-button--active": props.activeArea === "tools",
                })}
                onClick={props.onToolsClick}
            >
                Tools
            </Button>
        </Navbar.Group>
        <Navbar.Group align="right">
            <Button
                minimal={true}
                className={classNames({
                    "pz-navbar-button": true,
                    "pz-navbar-button--active": props.activeArea === "settings",
                })}
                onClick={props.onSettingsClick}
                icon="cog"
            />
        </Navbar.Group>
    </Navbar>
);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppNavbar);

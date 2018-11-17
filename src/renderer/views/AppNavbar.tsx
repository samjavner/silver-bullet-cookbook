import { faCog, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
    <nav className="navbar is-fixed-top is-primary">
        <div className="navbar-brand">
            <a
                href="#"
                className={classNames({
                    "navbar-item": true,
                    "is-active": props.activeArea === "home",
                })}
                onClick={props.onHomeClick}
            >
                <FontAwesomeIcon fixedWidth={true} icon={faHome} />
            </a>
            <a
                href="#"
                className={classNames({
                    "navbar-item": true,
                    "is-active": props.activeArea === "recipes",
                })}
                onClick={props.onRecipesClick}
            >
                Recipes
            </a>
            <a
                href="#"
                className={classNames({
                    "navbar-item": true,
                    "is-active": props.activeArea === "calendar",
                })}
                onClick={props.onCalendarClick}
            >
                Calendar
            </a>
            <a
                href="#"
                className={classNames({
                    "navbar-item": true,
                    "is-active": props.activeArea === "shopping",
                })}
                onClick={props.onShoppingClick}
            >
                Shopping
            </a>
            <a
                href="#"
                className={classNames({
                    "navbar-item": true,
                    "is-active": props.activeArea === "reference",
                })}
                onClick={props.onReferenceClick}
            >
                Reference
            </a>
            <a
                href="#"
                className={classNames({
                    "navbar-item": true,
                    "is-active": props.activeArea === "tools",
                })}
                onClick={props.onToolsClick}
            >
                Tools
            </a>
        </div>
        <div className="navbar-menu">
            <div className="navbar-end">
                <a
                    href="#"
                    className={classNames({
                        "navbar-item": true,
                        "is-active": props.activeArea === "settings",
                    })}
                    onClick={props.onSettingsClick}
                >
                    <FontAwesomeIcon fixedWidth={true} icon={faCog} />
                </a>
            </div>
        </div>
    </nav>
);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppNavbar);

import { faCog, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { GlobalState } from "../core/model";
import * as navigation from "../core/navigation";

interface AppNavbarProps {
    activeArea: navigation.Area;
    onHomeClick: () => void;
    onRecipesClick: () => void;
    onCalendarClick: () => void;
    onShoppingClick: () => void;
    onReferenceClick: () => void;
    onToolsClick: () => void;
    onSettingsClick: () => void;
}

export const AppNavbar: React.SFC<AppNavbarProps> = props => (
    <nav className="navbar is-primary">
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

const mapStateToProps = (state: GlobalState) => ({
    activeArea: navigation.selectors.getActiveArea(state),
});

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            onHomeClick: () => navigation.actions.setActiveArea("home"),
            onRecipesClick: () => navigation.actions.setActiveArea("recipes"),
            onCalendarClick: () => navigation.actions.setActiveArea("calendar"),
            onShoppingClick: () => navigation.actions.setActiveArea("shopping"),
            onReferenceClick: () =>
                navigation.actions.setActiveArea("reference"),
            onToolsClick: () => navigation.actions.setActiveArea("tools"),
            onSettingsClick: () => navigation.actions.setActiveArea("settings"),
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppNavbar);

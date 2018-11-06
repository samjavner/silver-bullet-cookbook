import { Button, ButtonGroup } from "@blueprintjs/core";
import classNames from "classnames";
import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import * as actions from "../../app/actions";
import { State } from "../../app/state";

function mapStateToProps(state: State) {
    return {
        activePage: state.activeSettingsPage,
    };
}

function mapDispatchToProps(dispatch: Dispatch<actions.Action>) {
    return {
        onSettingsClick: () =>
            dispatch(actions.setActiveSettingsPage("settings")),
        onAboutClick: () => dispatch(actions.setActiveSettingsPage("about")),
    };
}

type SettingsTabsProps = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>;

export const SettingsTabs: React.SFC<SettingsTabsProps> = props => (
    <>
        <div className="pz-navtabs">
            <ButtonGroup minimal={true}>
                <Button
                    className={classNames({
                        "pz-navtabs-button": true,
                        "pz-navtabs-button--active":
                            props.activePage === "settings",
                    })}
                    icon="cog"
                    onClick={props.onSettingsClick}
                >
                    Settings
                </Button>
                <Button
                    className={classNames({
                        "pz-navtabs-button": true,
                        "pz-navtabs-button--active":
                            props.activePage === "about",
                    })}
                    icon="info-sign"
                    onClick={props.onAboutClick}
                >
                    About
                </Button>
            </ButtonGroup>
        </div>
        <div style={{ borderTop: "1px solid lightgray" }} />
    </>
);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SettingsTabs);

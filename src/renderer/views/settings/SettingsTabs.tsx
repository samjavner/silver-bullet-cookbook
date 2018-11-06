import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import * as actions from "../../app/actions";
import { State } from "../../app/state";
import { Navtab, Navtabs } from "../../components/Navtabs";

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
    <Navtabs>
        <Navtab
            isActive={props.activePage === "settings"}
            icon="cog"
            text="Settings"
            onClick={props.onSettingsClick}
        />
        <Navtab
            isActive={props.activePage === "about"}
            icon="info-sign"
            text="About"
            onClick={props.onAboutClick}
        />
    </Navtabs>
);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SettingsTabs);

import { faCog, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { Navtab, Navtabs } from "../../components/Navtabs";
import { GlobalState } from "../../core/model";
import * as navigation from "../../core/navigation";

interface SettingsTabsProps {
    activePage: navigation.SettingsPage;
    onSettingsClick: () => void;
    onAboutClick: () => void;
}

export const SettingsTabs: React.SFC<SettingsTabsProps> = props => (
    <Navtabs>
        <Navtab
            isActive={props.activePage === "settings"}
            icon={faCog}
            text="Settings"
            onClick={props.onSettingsClick}
        />
        <Navtab
            isActive={props.activePage === "about"}
            icon={faInfoCircle}
            text="About"
            onClick={props.onAboutClick}
        />
    </Navtabs>
);

const mapStateToProps = (state: GlobalState) => ({
    activePage: navigation.selectors.getActiveSettingsPage(state),
});

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            onSettingsClick: () =>
                navigation.actions.setActiveSettingsPage("settings"),
            onAboutClick: () =>
                navigation.actions.setActiveSettingsPage("about"),
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SettingsTabs);

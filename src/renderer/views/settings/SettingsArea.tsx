import * as React from "react";
import { connect } from "react-redux";
import { GlobalState } from "../../core/model";
import * as navigation from "../../core/navigation";
import AboutPage from "./about/AboutPage";
import SettingsPage from "./settings/SettingsPage";
import SettingsTabs from "./SettingsTabs";

interface SettingsAreaProps {
    activePage: navigation.SettingsPage;
}

const SettingsArea: React.SFC<SettingsAreaProps> = props => (
    <>
        <SettingsTabs />
        {props.activePage === "settings" && <SettingsPage />}
        {props.activePage === "about" && <AboutPage />}
    </>
);

const mapStateToProps = (state: GlobalState) => ({
    activePage: navigation.selectors.getActiveSettingsPage(state),
});

export default connect(mapStateToProps)(SettingsArea);

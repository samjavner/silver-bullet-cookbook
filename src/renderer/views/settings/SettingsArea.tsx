import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import * as actions from "../../app/actions";
import { State } from "../../app/state";
import AboutPage from "./about/AboutPage";
import SettingsPage from "./settings/SettingsPage";
import SettingsTabs from "./SettingsTabs";

function mapStateToProps(state: State) {
    return {
        activePage: state.activeSettingsPage,
    };
}

function mapDispatchToProps(dispatch: Dispatch<actions.Action>) {
    return {};
}

type SettingsAreaProps = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>;

const SettingsArea: React.SFC<SettingsAreaProps> = props => (
    <>
        <SettingsTabs />
        {props.activePage === "settings" && <SettingsPage />}
        {props.activePage === "about" && <AboutPage />}
    </>
);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SettingsArea);

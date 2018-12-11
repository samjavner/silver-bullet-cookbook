import * as React from "react";
import { connect } from "react-redux";
import { GlobalState } from "../../../core/model";

export const SettingsPage: React.SFC = props => <div>Settings</div>;

const mapStateToProps = (state: GlobalState) => ({});

export default connect(mapStateToProps)(SettingsPage);

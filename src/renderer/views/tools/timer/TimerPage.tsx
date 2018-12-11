import * as React from "react";
import { connect } from "react-redux";
import { GlobalState } from "../../../core/model";

export const TimerPage: React.SFC = props => <div>Timer</div>;

const mapStateToProps = (state: GlobalState) => ({});

export default connect(mapStateToProps)(TimerPage);

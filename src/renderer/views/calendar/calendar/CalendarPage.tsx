import * as React from "react";
import { connect } from "react-redux";
import { GlobalState } from "../../../core/model";

export const CalendarPage: React.SFC = props => <div>Calendar</div>;

const mapStateToProps = (state: GlobalState) => ({});

export default connect(mapStateToProps)(CalendarPage);

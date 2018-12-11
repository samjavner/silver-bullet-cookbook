import * as React from "react";
import { connect } from "react-redux";
import { GlobalState } from "../../../core/model";

export const StatisticsPage: React.SFC = props => <div>Statistics</div>;

const mapStateToProps = (state: GlobalState) => ({});

export default connect(mapStateToProps)(StatisticsPage);

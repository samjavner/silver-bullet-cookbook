import * as React from "react";
import { connect } from "react-redux";
import { GlobalState } from "../../../core/model";

export const CalculatorPage: React.SFC = props => <div>Calculator</div>;

const mapStateToProps = (state: GlobalState) => ({});

export default connect(mapStateToProps)(CalculatorPage);

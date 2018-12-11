import * as React from "react";
import { connect } from "react-redux";
import { GlobalState } from "../../../core/model";

export const HomePage: React.SFC = props => <div>Home</div>;

const mapStateToProps = (state: GlobalState) => ({});

export default connect(mapStateToProps)(HomePage);

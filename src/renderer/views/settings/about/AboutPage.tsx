import * as React from "react";
import { connect } from "react-redux";
import { GlobalState } from "../../../core/model";

export const AboutPage: React.SFC = props => <div>About</div>;

const mapStateToProps = (state: GlobalState) => ({});

export default connect(mapStateToProps)(AboutPage);

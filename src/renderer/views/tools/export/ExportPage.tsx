import * as React from "react";
import { connect } from "react-redux";
import { GlobalState } from "../../../core/model";

export const ExportPage: React.SFC = props => <div>Export</div>;

const mapStateToProps = (state: GlobalState) => ({});

export default connect(mapStateToProps)(ExportPage);

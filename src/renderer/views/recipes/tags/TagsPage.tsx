import * as React from "react";
import { connect } from "react-redux";
import { GlobalState } from "../../../core/model";

export const TagsPage: React.SFC = props => <div>Tags</div>;

const mapStateToProps = (state: GlobalState) => ({});

export default connect(mapStateToProps)(TagsPage);

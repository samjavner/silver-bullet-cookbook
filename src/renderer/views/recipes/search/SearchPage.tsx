import * as React from "react";
import { connect } from "react-redux";
import { GlobalState } from "../../../core/model";

export const SearchPage: React.SFC = props => <div>Search</div>;

const mapStateToProps = (state: GlobalState) => ({});

export default connect(mapStateToProps)(SearchPage);

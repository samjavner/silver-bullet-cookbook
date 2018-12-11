import * as React from "react";
import { connect } from "react-redux";
import { GlobalState } from "../../../core/model";

export const LibraryPage: React.SFC = props => <div>Library</div>;

const mapStateToProps = (state: GlobalState) => ({});

export default connect(mapStateToProps)(LibraryPage);

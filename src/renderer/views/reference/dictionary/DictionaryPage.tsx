import * as React from "react";
import { connect } from "react-redux";
import { GlobalState } from "../../../core/model";

export const DictionaryPage: React.SFC = props => <div>Dictionary</div>;

const mapStateToProps = (state: GlobalState) => ({});

export default connect(mapStateToProps)(DictionaryPage);

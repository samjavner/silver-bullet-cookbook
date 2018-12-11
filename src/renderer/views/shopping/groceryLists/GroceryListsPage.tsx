import * as React from "react";
import { connect } from "react-redux";
import { GlobalState } from "../../../core/model";

export const GroceryListsPage: React.SFC = props => <div>Grocery Lists</div>;

const mapStateToProps = (state: GlobalState) => ({});

export default connect(mapStateToProps)(GroceryListsPage);

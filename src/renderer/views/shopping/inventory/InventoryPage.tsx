import * as React from "react";
import { connect } from "react-redux";
import { GlobalState } from "../../../core/model";

export const InventoryPage: React.SFC = props => <div>Inventory</div>;

const mapStateToProps = (state: GlobalState) => ({});

export default connect(mapStateToProps)(InventoryPage);

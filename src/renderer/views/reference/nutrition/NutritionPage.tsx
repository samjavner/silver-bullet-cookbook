import * as React from "react";
import { connect } from "react-redux";
import { GlobalState } from "../../../core/model";

export const NutritionPage: React.SFC = props => <div>Nutrition</div>;

const mapStateToProps = (state: GlobalState) => ({});

export default connect(mapStateToProps)(NutritionPage);

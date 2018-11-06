import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import * as actions from "../../../app/actions";
import { State } from "../../../app/state";

function mapStateToProps(state: State) {
    return {};
}

function mapDispatchToProps(dispatch: Dispatch<actions.Action>) {
    return {};
}

type NutritionPageProps = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>;

export const NutritionPage: React.SFC<NutritionPageProps> = props => (
    <div>Nutrition</div>
);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NutritionPage);

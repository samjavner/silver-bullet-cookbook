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

type RecipeBoxPageProps = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>;

export const RecipeBoxPage: React.SFC<RecipeBoxPageProps> = props => (
    <div>Recipe Box</div>
);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RecipeBoxPage);

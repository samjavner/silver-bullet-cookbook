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

type FavoritesPageProps = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>;

export const FavoritesPage: React.SFC<FavoritesPageProps> = props => (
    <div>Favorites</div>
);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FavoritesPage);

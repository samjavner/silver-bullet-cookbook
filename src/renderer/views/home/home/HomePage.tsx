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

type HomePageProps = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>;

export const HomePage: React.SFC<HomePageProps> = props => <div>Home</div>;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomePage);

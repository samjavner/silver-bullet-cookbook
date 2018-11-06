import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import * as actions from "../../app/actions";
import { State } from "../../app/state";
import HomePage from "./home/HomePage";
import HomeTabs from "./HomeTabs";

function mapStateToProps(state: State) {
    return {
        activePage: state.activeHomePage,
    };
}

function mapDispatchToProps(dispatch: Dispatch<actions.Action>) {
    return {};
}

type HomeAreaProps = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>;

const HomeArea: React.SFC<HomeAreaProps> = props => (
    <>
        <HomeTabs />
        {props.activePage === "home" && <HomePage />}
    </>
);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeArea);

import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import * as actions from "../../app/actions";
import { State } from "../../app/state";
import { Navtab, Navtabs } from "../../components/Navtabs";

function mapStateToProps(state: State) {
    return {
        activePage: state.activeHomePage,
    };
}

function mapDispatchToProps(dispatch: Dispatch<actions.Action>) {
    return {
        onHomeClick: () => dispatch(actions.setActiveHomePage("home")),
    };
}

type HomeTabsProps = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>;

export const HomeTabs: React.SFC<HomeTabsProps> = props => (
    <Navtabs>
        <Navtab
            isActive={props.activePage === "home"}
            icon="home"
            text="Home"
            onClick={props.onHomeClick}
        />
    </Navtabs>
);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeTabs);

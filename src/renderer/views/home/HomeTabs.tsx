import { faHome } from "@fortawesome/free-solid-svg-icons";
import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { Navtab, Navtabs } from "../../components/Navtabs";
import { GlobalState } from "../../core/model";
import * as navigation from "../../core/navigation";

interface HomeTabsProps {
    activePage: navigation.HomePage;
    onHomeClick: () => void;
}

export const HomeTabs: React.SFC<HomeTabsProps> = props => (
    <Navtabs>
        <Navtab
            isActive={props.activePage === "home"}
            icon={faHome}
            text="Home"
            onClick={props.onHomeClick}
        />
    </Navtabs>
);

const mapStateToProps = (state: GlobalState) => ({
    activePage: navigation.selectors.getActiveHomePage(state),
});

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            onHomeClick: () => navigation.actions.setActiveHomePage("home"),
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeTabs);

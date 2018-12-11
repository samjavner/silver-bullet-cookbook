import * as React from "react";
import { connect } from "react-redux";
import { GlobalState } from "../../core/model";
import * as navigation from "../../core/navigation";
import HomePage from "./home/HomePage";
import HomeTabs from "./HomeTabs";

interface HomeAreaProps {
    activePage: navigation.HomePage;
}

const HomeArea: React.SFC<HomeAreaProps> = props => (
    <>
        <HomeTabs />
        {props.activePage === "home" && <HomePage />}
    </>
);

const mapStateToProps = (state: GlobalState) => ({
    activePage: navigation.selectors.getActiveHomePage(state),
});

export default connect(mapStateToProps)(HomeArea);

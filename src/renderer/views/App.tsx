import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import * as actions from "../app/actions";
import { State } from "../app/state";
import AppNavbar from "./AppNavbar";
import CalendarArea from "./calendar/CalendarArea";
import HomeArea from "./home/HomeArea";
import RecipesArea from "./recipes/RecipesArea";
import ReferenceArea from "./reference/ReferenceArea";
import SettingsArea from "./settings/SettingsArea";
import ShoppingArea from "./shopping/ShoppingArea";
import ToolsArea from "./tools/ToolsArea";

function mapStateToProps(state: State) {
    return {
        activeArea: state.activeArea,
    };
}

function mapDispatchToProps(dispatch: Dispatch<actions.Action>) {
    return {};
}

type AppProps = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>;

const App: React.SFC<AppProps> = props => (
    <>
        <AppNavbar />
        {props.activeArea === "home" && <HomeArea />}
        {props.activeArea === "recipes" && <RecipesArea />}
        {props.activeArea === "calendar" && <CalendarArea />}
        {props.activeArea === "shopping" && <ShoppingArea />}
        {props.activeArea === "reference" && <ReferenceArea />}
        {props.activeArea === "tools" && <ToolsArea />}
        {props.activeArea === "settings" && <SettingsArea />}
    </>
);
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

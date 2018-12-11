import * as React from "react";
import { connect } from "react-redux";
import { GlobalState } from "../core/model";
import * as navigation from "../core/navigation";
import { Area } from "../core/navigation/model";
import AppNavbar from "./AppNavbar";
import CalendarArea from "./calendar/CalendarArea";
import HomeArea from "./home/HomeArea";
import RecipesArea from "./recipes/RecipesArea";
import ReferenceArea from "./reference/ReferenceArea";
import SettingsArea from "./settings/SettingsArea";
import ShoppingArea from "./shopping/ShoppingArea";
import ToolsArea from "./tools/ToolsArea";

interface AppProps {
    activeArea: Area;
}

const App: React.SFC<AppProps> = props => (
    <div
        style={{
            height: "100vh",
            width: "100vw",
            display: "grid",
            gridTemplateRows: "auto 1fr",
        }}
    >
        <div style={{ gridRow: 1 }}>
            <AppNavbar />
        </div>
        <div style={{ gridRow: 2, overflow: "hidden" }}>
            {props.activeArea === "home" && <HomeArea />}
            {props.activeArea === "recipes" && <RecipesArea />}
            {props.activeArea === "calendar" && <CalendarArea />}
            {props.activeArea === "shopping" && <ShoppingArea />}
            {props.activeArea === "reference" && <ReferenceArea />}
            {props.activeArea === "tools" && <ToolsArea />}
            {props.activeArea === "settings" && <SettingsArea />}
        </div>
    </div>
);

const mapStateToProps = (state: GlobalState) => ({
    activeArea: navigation.selectors.getActiveArea(state),
});

export default connect(mapStateToProps)(App);

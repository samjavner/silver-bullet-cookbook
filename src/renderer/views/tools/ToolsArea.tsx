import * as React from "react";
import { connect } from "react-redux";
import { GlobalState } from "../../core/model";
import * as navigation from "../../core/navigation";
import CalculatorPage from "./calculator/CalculatorPage";
import ExportPage from "./export/ExportPage";
import ImportPage from "./import/ImportPage";
import StatisticsPage from "./statistics/StatisticsPage";
import TimerPage from "./timer/TimerPage";
import ToolsTabs from "./ToolsTabs";

interface ToolsAreaProps {
    activePage: navigation.ToolsPage;
}

const ToolsArea: React.SFC<ToolsAreaProps> = props => (
    <>
        <ToolsTabs />
        {props.activePage === "calculator" && <CalculatorPage />}
        {props.activePage === "timer" && <TimerPage />}
        {props.activePage === "import" && <ImportPage />}
        {props.activePage === "export" && <ExportPage />}
        {props.activePage === "statistics" && <StatisticsPage />}
    </>
);

const mapStateToProps = (state: GlobalState) => ({
    activePage: navigation.selectors.getActiveToolsPage(state),
});

export default connect(mapStateToProps)(ToolsArea);

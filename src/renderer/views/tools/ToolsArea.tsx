import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import * as actions from "../../app/actions";
import { State } from "../../app/state";
import CalculatorPage from "./calculator/CalculatorPage";
import ExportPage from "./export/ExportPage";
import ImportPage from "./import/ImportPage";
import StatisticsPage from "./statistics/StatisticsPage";
import TimerPage from "./timer/TimerPage";
import ToolsTabs from "./ToolsTabs";

function mapStateToProps(state: State) {
    return {
        activePage: state.activeToolsPage,
    };
}

function mapDispatchToProps(dispatch: Dispatch<actions.Action>) {
    return {};
}

type ToolsAreaProps = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>;

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

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ToolsArea);

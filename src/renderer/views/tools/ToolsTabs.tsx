import {
    faCalculator,
    faChartPie,
    faFileExport,
    faFileImport,
    faStopwatch,
} from "@fortawesome/free-solid-svg-icons";
import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import * as actions from "../../app/actions";
import { State } from "../../app/state";
import { Navtab, Navtabs } from "../../components/Navtabs";

function mapStateToProps(state: State) {
    return {
        activePage: state.activeToolsPage,
    };
}

function mapDispatchToProps(dispatch: Dispatch<actions.Action>) {
    return {
        onCalculatorClick: () =>
            dispatch(actions.setActiveToolsPage("calculator")),
        onTimerClick: () => dispatch(actions.setActiveToolsPage("timer")),
        onImportClick: () => dispatch(actions.setActiveToolsPage("import")),
        onExportClick: () => dispatch(actions.setActiveToolsPage("export")),
        onStatisticsClick: () =>
            dispatch(actions.setActiveToolsPage("statistics")),
    };
}

type ToolsTabsProps = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>;

export const ToolsTabs: React.SFC<ToolsTabsProps> = props => (
    <Navtabs>
        <Navtab
            isActive={props.activePage === "calculator"}
            icon={faCalculator}
            text="Calculator"
            onClick={props.onCalculatorClick}
        />
        <Navtab
            isActive={props.activePage === "timer"}
            icon={faStopwatch}
            text="Timer"
            onClick={props.onTimerClick}
        />
        <Navtab
            isActive={props.activePage === "import"}
            icon={faFileImport}
            text="Import"
            onClick={props.onImportClick}
        />
        <Navtab
            isActive={props.activePage === "export"}
            icon={faFileExport}
            text="Export"
            onClick={props.onExportClick}
        />
        <Navtab
            isActive={props.activePage === "statistics"}
            icon={faChartPie}
            text="Statistics"
            onClick={props.onStatisticsClick}
        />
    </Navtabs>
);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ToolsTabs);

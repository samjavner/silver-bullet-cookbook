import {
    faCalculator,
    faChartPie,
    faFileExport,
    faFileImport,
    faStopwatch,
} from "@fortawesome/free-solid-svg-icons";
import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { Navtab, Navtabs } from "../../components/Navtabs";
import { GlobalState } from "../../core/model";
import * as navigation from "../../core/navigation";

interface ToolsTabsProps {
    activePage: navigation.ToolsPage;
    onCalculatorClick: () => void;
    onTimerClick: () => void;
    onImportClick: () => void;
    onExportClick: () => void;
    onStatisticsClick: () => void;
}

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

const mapStateToProps = (state: GlobalState) => ({
    activePage: navigation.selectors.getActiveToolsPage(state),
});

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            onCalculatorClick: () =>
                navigation.actions.setActiveToolsPage("calculator"),
            onTimerClick: () => navigation.actions.setActiveToolsPage("timer"),
            onImportClick: () =>
                navigation.actions.setActiveToolsPage("import"),
            onExportClick: () =>
                navigation.actions.setActiveToolsPage("export"),
            onStatisticsClick: () =>
                navigation.actions.setActiveToolsPage("statistics"),
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ToolsTabs);

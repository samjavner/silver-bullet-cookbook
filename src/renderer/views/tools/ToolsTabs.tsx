import { Button, ButtonGroup } from "@blueprintjs/core";
import classNames from "classnames";
import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import * as actions from "../../app/actions";
import { State } from "../../app/state";

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
    <>
        <div className="pz-navtabs">
            <ButtonGroup minimal={true}>
                <Button
                    className={classNames({
                        "pz-navtabs-button": true,
                        "pz-navtabs-button--active":
                            props.activePage === "calculator",
                    })}
                    icon="calculator"
                    onClick={props.onCalculatorClick}
                >
                    Calculator
                </Button>
                <Button
                    className={classNames({
                        "pz-navtabs-button": true,
                        "pz-navtabs-button--active":
                            props.activePage === "timer",
                    })}
                    icon="time"
                    onClick={props.onTimerClick}
                >
                    Timer
                </Button>
                <Button
                    className={classNames({
                        "pz-navtabs-button": true,
                        "pz-navtabs-button--active":
                            props.activePage === "import",
                    })}
                    icon="import"
                    onClick={props.onImportClick}
                >
                    Import
                </Button>
                <Button
                    className={classNames({
                        "pz-navtabs-button": true,
                        "pz-navtabs-button--active":
                            props.activePage === "export",
                    })}
                    icon="export"
                    onClick={props.onExportClick}
                >
                    Export
                </Button>
                <Button
                    className={classNames({
                        "pz-navtabs-button": true,
                        "pz-navtabs-button--active":
                            props.activePage === "statistics",
                    })}
                    icon="pie-chart"
                    onClick={props.onStatisticsClick}
                >
                    Statistics
                </Button>
            </ButtonGroup>
        </div>
        <div style={{ borderTop: "1px solid lightgray" }} />
    </>
);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ToolsTabs);

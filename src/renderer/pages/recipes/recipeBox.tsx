import classNames from "classnames";
import * as React from "react";
import {
    ArrowKeyStepper,
    AutoSizer,
    defaultCellRangeRenderer,
    Grid,
    GridCellRangeProps,
} from "react-virtualized";
import * as statistics from "../tools/statistics";
import * as util from "../util";

// MODEL

export interface Model {
    selectedIndex: number;
}

export const init: Model = {
    selectedIndex: 0,
};

// UPDATE

export const update = {
    setSelectedIndex(model: Model, index: number): Model {
        return {
            ...model,
            selectedIndex: index,
        };
    },
};

// VIEW

export type ViewModel = util.ViewModel<Model, typeof update>;

export interface Props {
    vm: ViewModel;
    statisticsVm: statistics.ViewModel;
}

/**
 * Implementation of cellRangeRenderer with caching disabled.
 * This is useful so that cells are re-rendered while stepping with arrow keys.
 */
function uncachedCellRangeRenderer(gridCellRangeProps: GridCellRangeProps) {
    return defaultCellRangeRenderer({
        ...gridCellRangeProps,
        cellCache: {},
    });
}

export const Page: React.FunctionComponent<Props> = ({ vm, statisticsVm }) => (
    <div
        style={{
            height: "100%",
            display: "grid",
            gridTemplateColumns: "20rem 4fr",
        }}
    >
        <div style={{ gridColumn: 1 }}>
            <AutoSizer>
                {({ height, width }) => (
                    <ArrowKeyStepper
                        mode="cells"
                        isControlled={true}
                        columnCount={1}
                        rowCount={50000}
                        scrollToColumn={1}
                        scrollToRow={vm.selectedIndex}
                        onScrollToChange={({ scrollToRow }) =>
                            vm.setSelectedIndex(scrollToRow)
                        }
                    >
                        {({
                            onSectionRendered,
                            scrollToColumn,
                            scrollToRow,
                        }) => (
                            <Grid
                                onSectionRendered={onSectionRendered}
                                scrollToColumn={scrollToColumn}
                                scrollToRow={scrollToRow}
                                height={height}
                                width={width}
                                rowCount={50000}
                                columnCount={1}
                                rowHeight={25}
                                columnWidth={width}
                                autoContainerWidth={true}
                                cellRangeRenderer={uncachedCellRangeRenderer}
                                cellRenderer={({ key, rowIndex, style }) => (
                                    <div
                                        key={key}
                                        style={style}
                                        className={classNames({
                                            "has-background-link has-text-white":
                                                rowIndex === vm.selectedIndex,
                                        })}
                                        onClick={() =>
                                            vm.setSelectedIndex(rowIndex)
                                        }
                                    >
                                        Recipe {rowIndex}
                                    </div>
                                )}
                                cell={true}
                            />
                        )}
                    </ArrowKeyStepper>
                )}
            </AutoSizer>
        </div>
        <div style={{ gridColumn: 2, overflowY: "auto" }}>
            <div>Random number: {statisticsVm.dieFace}</div>
            <button className="button" onClick={statisticsVm.roll}>
                Do It!
            </button>
            <div>Index: {vm.selectedIndex}</div>
            {[...Array(10).keys()].map(x => (
                <div className="section" key={x}>
                    Paragraph {x}
                </div>
            ))}
        </div>
    </div>
);

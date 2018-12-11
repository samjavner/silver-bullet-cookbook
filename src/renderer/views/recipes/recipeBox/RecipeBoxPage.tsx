import classNames from "classnames";
import * as React from "react";
import { connect } from "react-redux";
import {
    ArrowKeyStepper,
    AutoSizer,
    defaultCellRangeRenderer,
    Grid,
    GridCellRangeProps,
} from "react-virtualized";
import { bindActionCreators, Dispatch } from "redux";
import { GlobalState } from "../../../core/model";
import * as recipeBox from "../../../core/recipeBox";

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

interface RecipeBoxPageProps {
    selectedIndex: number;
    setSelectedIndex: (index: number) => void;
}

export const RecipeBoxPage: React.SFC<RecipeBoxPageProps> = props => (
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
                        scrollToRow={props.selectedIndex}
                        onScrollToChange={({ scrollToRow }) =>
                            props.setSelectedIndex(scrollToRow)
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
                                                rowIndex ===
                                                props.selectedIndex,
                                        })}
                                        onClick={() =>
                                            props.setSelectedIndex(rowIndex)
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
            <div>Index: {props.selectedIndex}</div>
            {[...Array(10).keys()].map(x => (
                <div className="section" key={x}>
                    Paragraph {x}
                </div>
            ))}
        </div>
    </div>
);

const mapStateToProps = (state: GlobalState) => ({
    selectedIndex: recipeBox.selectors.getSelectedIndex(state),
});

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            setSelectedIndex: recipeBox.actions.setSelectedIndex,
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RecipeBoxPage);

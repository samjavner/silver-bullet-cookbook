import classNames from "classnames";
import * as React from "react";
import {
    ArrowKeyStepper,
    AutoSizer,
    defaultCellRangeRenderer,
    Grid,
    GridCellRangeProps,
} from "react-virtualized";
import * as uuid from "uuid";
import { RecipeBox } from "../../core/recipes/recipeBox";
import { Recipe } from "../../db/recipe";
import RecipeEditModal from "./RecipeEditModal";
import RecipeView from "./RecipeView";

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

export const RecipeBoxPage: React.FunctionComponent<{
    recipeBox: RecipeBox;
}> = ({ recipeBox }) => {
    const recipe: Recipe | undefined =
        recipeBox.recipes[recipeBox.selectedIndex];

    return (
        <>
            <div
                style={{
                    height: "100%",
                    display: "grid",
                    gridTemplateColumns: "20rem 4fr",
                }}
            >
                <div
                    style={{
                        gridColumn: 1,
                        borderRight: "1px solid #c8cfd0", // $border
                    }}
                >
                    <AutoSizer>
                        {({ height, width }) => (
                            <ArrowKeyStepper
                                mode="cells"
                                isControlled={true}
                                columnCount={1}
                                rowCount={recipeBox.recipes.length}
                                scrollToColumn={1}
                                scrollToRow={recipeBox.selectedIndex}
                                onScrollToChange={({ scrollToRow }) =>
                                    recipeBox.setSelectedIndex(scrollToRow)
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
                                        rowCount={recipeBox.recipes.length}
                                        columnCount={1}
                                        rowHeight={25}
                                        columnWidth={width}
                                        autoContainerWidth={true}
                                        cellRangeRenderer={
                                            uncachedCellRangeRenderer
                                        }
                                        cellRenderer={({
                                            key,
                                            rowIndex,
                                            style,
                                        }) => (
                                            <div
                                                key={key}
                                                style={style}
                                                className={classNames({
                                                    "has-background-link has-text-white":
                                                        rowIndex ===
                                                        recipeBox.selectedIndex,
                                                })}
                                                onClick={() =>
                                                    recipeBox.setSelectedIndex(
                                                        rowIndex
                                                    )
                                                }
                                            >
                                                {
                                                    recipeBox.recipes[rowIndex]
                                                        .name
                                                }
                                            </div>
                                        )}
                                        cell={true}
                                    />
                                )}
                            </ArrowKeyStepper>
                        )}
                    </AutoSizer>
                </div>
                <div
                    style={{
                        gridColumn: 2,
                        overflowY: "auto",
                        padding: "1rem",
                    }}
                >
                    <button
                        className="button"
                        onClick={recipeBox.openAddRecipe}
                        style={{ marginBottom: "1rem" }}
                    >
                        Add Recipe
                    </button>
                    {recipe && <RecipeView recipe={recipe} />}
                </div>
            </div>
            {recipeBox.isAddRecipeActive && (
                <RecipeEditModal
                    title="New Recipe"
                    init={{
                        id: uuid.v4(),
                        name: "New Recipe",
                        ingredients: "",
                        directions: "",
                    }}
                    save={recipeBox.saveAddRecipe}
                    close={recipeBox.closeAddRecipe}
                />
            )}
            {recipeBox.isEditRecipeActive && (
                <RecipeEditModal
                    title="Edit Recipe"
                    init={{
                        id: uuid.v4(),
                        name: "",
                        ingredients: "",
                        directions: "",
                    }}
                    save={recipeBox.closeEditRecipe}
                    close={recipeBox.closeEditRecipe}
                />
            )}
        </>
    );
};

export default RecipeBoxPage;
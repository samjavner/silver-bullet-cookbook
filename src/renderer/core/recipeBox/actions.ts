import { createStandardAction } from "typesafe-actions";

export const setSelectedIndex = createStandardAction(
    "recipeBox/SET_SELECTED_INDEX"
)<number>();

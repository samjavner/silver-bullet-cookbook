import { combineReducers } from "redux";
import * as navigation from "../core/navigation";
import * as recipeBox from "../core/recipeBox";

export const reducer = combineReducers({
    [navigation.moduleName]: navigation.reducer,
    [recipeBox.moduleName]: recipeBox.reducer,
});

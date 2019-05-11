import * as sqlite from "sqlite";
import { getAll, Recipe } from "../../db/recipe";
import { SetState, useSelector } from "../../store";
import { CommandProvider } from "../commandProvider";

export type RecipeBox = ReturnType<typeof selector>;

export const useRecipeBox = (
    commandProvider: CommandProvider,
    db: sqlite.Database
): RecipeBox => useSelector(selector, init, commandProvider, db);

// MODEL

interface State {
    recipes: Recipe[];
    selectedIndex: number;
    isAddRecipeActive: boolean;
    isEditRecipeActive: boolean;
}

const init: State = {
    recipes: [],
    selectedIndex: 0,
    isAddRecipeActive: false,
    isEditRecipeActive: false,
};

// SELECTOR

const selector = (
    snapshot: State,
    setState: SetState<State>,
    commandProvider: CommandProvider,
    db: sqlite.Database
) => {
    const setSelectedIndex = (index: number) =>
        setState(state => ({ ...state, selectedIndex: index }));

    const openAddRecipe = () =>
        setState(state => ({ ...state, isAddRecipeActive: true }));

    const closeAddRecipe = () =>
        setState(state => ({ ...state, isAddRecipeActive: false }));

    const openEditRecipe = () =>
        setState(state => ({ ...state, isEditRecipeActive: true }));

    const closeEditRecipe = () =>
        setState(state => ({ ...state, isEditRecipeActive: false }));

    const refresh = async () => {
        const recipes = await getAll(db);
        setState(state => ({
            ...state,
            recipes,
        }));
    };

    const saveAddRecipe = async (recipe: Recipe) => {
        await commandProvider.execute({
            type: "recipe_create",
            recipe,
        });
        await refresh();
        setState(state => ({ ...state, isAddRecipeActive: false }));
    };

    const saveEditRecipe = async (recipe: Recipe) => {
        await commandProvider.execute({
            type: "recipe_edit",
            recipe,
        });
        await refresh();
        setState(state => ({ ...state, isEditRecipeActive: false }));
    };

    const addMultiple = async (recipes: Recipe[]) => {
        await commandProvider.execute({
            type: "recipe_import",
            recipes,
        });
        await refresh();
        setState(state => ({ ...state, isEditRecipeActive: false }));
    };

    return {
        ...snapshot,
        setSelectedIndex,
        openAddRecipe,
        closeAddRecipe,
        openEditRecipe,
        closeEditRecipe,
        saveAddRecipe,
        saveEditRecipe,
        addMultiple,
    };
};

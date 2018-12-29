import * as sqlite from "sqlite";
import { getAll, Recipe } from "../../db/recipe";
import { Dispatch, Store, UseStore } from "../../store";
import { CommandProvider } from "../commandProvider";

export type RecipeBox = Store<Model, Update, Commands>;

export function useRecipeBox(
    useStore: UseStore<Model, Update, Commands>,
    commandProvider: CommandProvider,
    db: sqlite.Database
): RecipeBox {
    return useStore({
        init,
        update,
        createCommands: createCommands(commandProvider, db),
        memo: [commandProvider, db],
    });
}

// MODEL

export interface Model {
    recipes: Recipe[];
    selectedIndex: number;
    isAddRecipeActive: boolean;
    isEditRecipeActive: boolean;
}

export const init: Model = {
    recipes: [],
    selectedIndex: 0,
    isAddRecipeActive: false,
    isEditRecipeActive: false,
};

// UPDATE

export type Update = typeof update;

export const update = {
    refreshSuccess(model: Model, recipes: Recipe[]): Model {
        return {
            ...model,
            recipes,
        };
    },
    setSelectedIndex(model: Model, index: number): Model {
        return {
            ...model,
            selectedIndex: index,
        };
    },
    openAddRecipe(model: Model): Model {
        return {
            ...model,
            isAddRecipeActive: true,
        };
    },
    closeAddRecipe(model: Model): Model {
        return {
            ...model,
            isAddRecipeActive: false,
        };
    },
    openEditRecipe(model: Model): Model {
        return {
            ...model,
            isEditRecipeActive: true,
        };
    },
    closeEditRecipe(model: Model): Model {
        return {
            ...model,
            isEditRecipeActive: false,
        };
    },
};

// COMMANDS

export type Commands = ReturnType<ReturnType<typeof createCommands>>;

export const createCommands = (
    commandProvider: CommandProvider,
    db: sqlite.Database
) => (model: Model, dispatch: Dispatch<Update>) => {
    async function refresh(): Promise<void> {
        const recipes = await getAll(db);
        dispatch.refreshSuccess(recipes);
    }

    async function saveAddRecipe(recipe: Recipe): Promise<void> {
        await commandProvider.execute({
            type: "recipe_create",
            recipe,
        });
        await refresh();
        dispatch.closeAddRecipe();
    }

    async function addMultiple(recipes: Recipe[]): Promise<void> {
        await commandProvider.execute({
            type: "recipe_import",
            recipes,
        });
        await refresh();
    }

    return {
        saveAddRecipe,
        refresh,
        addMultiple,
    };
};

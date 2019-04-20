import { Recipe } from "../../db/recipe";
import { Store, UseStore } from "../../store";

export type RecipeEdit = Store<Model, Update>;

export function useRecipeEdit(
    useStore: UseStore<Model, Update>,
    init: Model
): RecipeEdit {
    return useStore({
        init,
        update,
    });
}

// MODEL

export type Model = Recipe;

// SELECTORS

export function isValid(model: Model): boolean {
    return model.name.trim() !== "";
}

// UPDATE

export type Update = typeof update;

export const update = {
    setName: (model: Model, name: string): Model => ({
        ...model,
        name,
    }),
    setUrl: (model: Model, url: string): Model => ({
        ...model,
        url,
    }),
    setDescription: (model: Model, description: string): Model => ({
        ...model,
        description,
    }),
    setIngredients: (model: Model, ingredients: string): Model => ({
        ...model,
        ingredients,
    }),
    setDirections: (model: Model, directions: string): Model => ({
        ...model,
        directions,
    }),
    setNotes: (model: Model, notes: string): Model => ({
        ...model,
        notes,
    }),
};

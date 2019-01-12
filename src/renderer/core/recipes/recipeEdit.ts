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
    setServings: (model: Model, servings: string): Model => ({
        ...model,
        servings,
    }),
    setYield: (model: Model, yieldValue: string): Model => ({
        ...model,
        yield: yieldValue,
    }),
    setPrepTime: (model: Model, prepTime: string): Model => ({
        ...model,
        prepTime,
    }),
    setCookTime: (model: Model, cookTime: string): Model => ({
        ...model,
        cookTime,
    }),
    setTotalTime: (model: Model, totalTime: string): Model => ({
        ...model,
        totalTime,
    }),
    setOvenTemperature: (model: Model, ovenTemperature: string): Model => ({
        ...model,
        ovenTemperature,
    }),
    setNotes: (model: Model, notes: string): Model => ({
        ...model,
        notes,
    }),
    setIngredients: (model: Model, ingredients: string): Model => ({
        ...model,
        ingredients,
    }),
    setDirections: (model: Model, directions: string): Model => ({
        ...model,
        directions,
    }),
};

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

export interface Model {
    id: string;
    name: string;
    ingredients: string;
    directions: string;
}

// SELECTORS

export function isValid(model: Model): boolean {
    return model.name.trim() !== "";
}

// UPDATE

export type Update = typeof update;

export const update = {
    setName(model: Model, name: string): Model {
        return {
            ...model,
            name,
        };
    },
    setIngredients(model: Model, ingredients: string): Model {
        return {
            ...model,
            ingredients,
        };
    },
    setDirections(model: Model, directions: string): Model {
        return {
            ...model,
            directions,
        };
    },
};

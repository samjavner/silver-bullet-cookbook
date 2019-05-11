import { Recipe } from "../../db/recipe";
import { SetState, useSelector } from "../../store";

export type RecipeEdit = ReturnType<typeof selector>;

export const useRecipeEdit = (init: Recipe): RecipeEdit =>
    useSelector(selector, init);

// MODEL

type State = Recipe;

// SELECTOR

const selector = (snapshot: State, setState: SetState<State>) => {
    const isValid = snapshot.name.trim() !== "";

    const setName = (name: string) => setState(state => ({ ...state, name }));

    const setUrl = (url: string) => setState(state => ({ ...state, url }));

    const setDescription = (description: string) =>
        setState(state => ({ ...state, description }));

    const setIngredients = (ingredients: string) =>
        setState(state => ({ ...state, ingredients }));

    const setDirections = (directions: string) =>
        setState(state => ({ ...state, directions }));

    const setNotes = (notes: string) =>
        setState(state => ({ ...state, notes }));

    return {
        ...snapshot,
        isValid,
        setName,
        setUrl,
        setDescription,
        setIngredients,
        setDirections,
        setNotes,
    };
};

import { Recipe } from "../../db/recipe";
import { SetState, useSelector } from "../../store";

export type RecipeEdit = ReturnType<typeof selector>;

export const useRecipeEdit = (recipe: Recipe): RecipeEdit =>
    useSelector(selector, init(recipe));

// MODEL

interface State extends Recipe {
    selectedTab: RecipeEditTab;
}

export type RecipeEditTab = "recipe" | "media" | "source" | "capture";

const init = (recipe: Recipe): State => ({
    ...recipe,
    selectedTab: "recipe",
});

// SELECTOR

const selector = (snapshot: State, setState: SetState<State>) => {
    const recipe: Recipe = {
        id: snapshot.id,
        name: snapshot.name,
        url: snapshot.url,
        description: snapshot.description,
        tags: snapshot.tags,
        ingredients: snapshot.ingredients,
        directions: snapshot.directions,
        notes: snapshot.notes,
        sourceText: snapshot.sourceText,
        importWarnings: snapshot.importWarnings,
    };
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

    const setSelectedTab = (selectedTab: RecipeEditTab) =>
        setState(state => ({ ...state, selectedTab }));

    return {
        ...snapshot,
        recipe,
        isValid,
        setName,
        setUrl,
        setDescription,
        setIngredients,
        setDirections,
        setNotes,
        setSelectedTab,
    };
};

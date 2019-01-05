import * as db from "../../db/recipe";
import * as parser from "./parser";

export function mapMxpToDb(
    recipe: parser.Recipe,
    source: string[],
    id: string
): db.Recipe {
    return {
        id,
        name: recipe.title || "Imported Recipe",
        servings: recipe.servingSize || "",
        yield: "",
        categories: recipe.categories,
        ingredients: recipe.ingredients.map(mapIngredient).join("\n"),
        directions: recipe.directions.join("\n"),
        sourceText: source.join("\n"),
        importWarnings: [],
        // TODO: recipeBy: string | undefined;
        // TODO: preparationTime: string | undefined;
        // TODO: notes: string[];
    };
}

function mapIngredient(ingredient: parser.Ingredient): string {
    const text = (
        ingredient.amount +
        " " +
        (ingredient.measure + " " + ingredient.text).trim()
    ).trim();

    return ingredient.preparationMethod
        ? `${text}; ${ingredient.preparationMethod}`
        : text;
}

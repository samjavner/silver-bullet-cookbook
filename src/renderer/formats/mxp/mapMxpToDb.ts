import * as db from "../../db/recipe";
import * as parser from "./parser";

export function mapMxpToDb(
    recipe: parser.Recipe,
    source: string[],
    id: string
): db.Recipe {
    const tags = [...recipe.categories];
    if (recipe.recipeBy) {
        tags.push(`by: ${recipe.recipeBy}`);
    }

    return {
        id,
        name: recipe.title || "Imported Recipe",
        url: "",
        description: "",
        tags,
        servings: recipe.servingSize || "",
        yield: "",
        prepTime: "",
        cookTime: "",
        totalTime: "",
        ovenTemperature: "",
        notes: "",
        ingredients: recipe.ingredients.map(mapIngredient).join("\n"),
        directions: recipe.directions.join("\n"),
        sourceText: source.join("\n"),
        importWarnings: [],
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

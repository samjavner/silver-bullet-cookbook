import { ImportRecipe } from "../model";
import * as parser from "./parser";

export function mapFromMxp(recipe: parser.Recipe): ImportRecipe {
    return {
        name: recipe.title || "",
        url: "",
        description: "",
        ingredients: recipe.ingredients.map(mapIngredient).join("\n"),
        directions: recipe.directions.join("\n"),
        importWarnings: [],
        extras: {
            categories: recipe.categories,
            recipeBy: recipe.recipeBy,
            servingSize: recipe.servingSize,
            preparationTime: recipe.preparationTime,
            notes: recipe.notes,
        },
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

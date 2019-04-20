import { ImportRecipe } from "../model";
import * as parser from "./parser";

export function mapFromMmf(recipe: parser.Recipe): ImportRecipe {
    return {
        name: recipe.title || "",
        url: "",
        description: "",
        ingredients: recipe.ingredients.map(mapIngredientOrHeading).join("\n"),
        directions: recipe.directions.join("\n"),
        importWarnings: recipe.warnings,
        extras: {
            categories: recipe.categories,
            servings: recipe.servings,
            yield: recipe.yield,
        },
    };
}

function mapIngredientOrHeading(
    ingredient: parser.Ingredient | parser.IngredientHeading
): string {
    return ingredient.type === "ingredient"
        ? mapIngredient(ingredient)
        : mapIngredientHeading(ingredient);
}

function mapIngredient(ingredient: parser.Ingredient): string {
    return (
        ingredient.quantity +
        " " +
        (ingredient.unit + " " + ingredient.text).trim()
    ).trim();
}

function mapIngredientHeading(heading: parser.IngredientHeading): string {
    return `# ${heading.text}`;
}

import * as db from "../../db/recipe";
import * as parser from "./parser";

export function mapMmfToDb(
    recipe: parser.Recipe,
    source: string[],
    id: string
): db.Recipe {
    return {
        id,
        name: recipe.title || "Imported Recipe",
        servings: recipe.servings || "",
        yield: recipe.yield || "",
        categories: recipe.categories,
        ingredients: recipe.ingredients.map(mapIngredientOrHeading).join("\n"),
        directions: recipe.directions.join("\n"),
        source: "",
        author: "",
        webPage: "",
        sourcePageNumber: "",
        copyright: "",
        publisher: "",
        publishDate: "",
        sourceText: source.join("\n"),
        importWarnings: recipe.warnings,
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

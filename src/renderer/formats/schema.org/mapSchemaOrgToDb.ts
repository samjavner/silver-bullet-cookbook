import * as db from "../../db/recipe";
import * as model from "./model";

export function mapSchemaOrgToDb(recipe: model.Recipe, id: string): db.Recipe {
    return {
        id,
        name: recipe.name || "Imported Recipe",
        servings: "",
        yield: recipe.recipeYield || "",
        categories: recipe.recipeCategories,
        ingredients: recipe.recipeIngredients.join("\n"),
        directions: recipe.recipeInstructions.join("\n"),
        sourceText: "",
        importWarnings: recipe.warnings,
        // TODO: aggregateRating: AggregateRating | undefined;
        // TODO: authors: Person[];
        // TODO: cookingMethods: string[];
        // TODO: cookTime: string | undefined;
        // TODO: dateModified: string | undefined;
        // TODO: datePublished: string | undefined;
        // TODO: description: string | undefined;
        // TODO: headline: string | undefined;
        // TODO: images: ImageObject[];
        // TODO: keywords: string | undefined;
        // TODO: mainEntityOfPage: boolean | undefined;
        // TODO: prepTime: string | undefined;
        // TODO: publisher: Organization | undefined;
        // TODO: reviews: Review[];
        // TODO: totalTime: string | undefined;
        // TODO: url: string | undefined;
    };
}

import * as db from "../../db/recipe";
import * as model from "./model";

export function mapSchemaOrgToDb(recipe: model.Recipe, id: string): db.Recipe {
    const tags = [
        ...recipe.recipeCategories,
        ...(recipe.authors
            .filter(x => x.name)
            .map(x => `author: ${x.name}`) as string[]),
    ];
    if (recipe.publisher && recipe.publisher.name) {
        tags.push(`publisher: ${recipe.publisher.name}`);
    }
    if (recipe.datePublished) {
        tags.push(`publish date: ${recipe.datePublished}`);
    }

    return {
        id,
        name: recipe.name || "Imported Recipe",
        url: recipe.url || "",
        description: "",
        tags,
        servings: "",
        yield: recipe.recipeYield || "",
        prepTime: "",
        cookTime: "",
        totalTime: "",
        ovenTemperature: "",
        notes: "",
        ingredients: recipe.recipeIngredients.join("\n"),
        directions: recipe.recipeInstructions.join("\n"),
        sourceText: "",
        importWarnings: recipe.warnings,
        // TODO: aggregateRating: AggregateRating | undefined;
        // TODO: authors[i].url: string | undefined;
        // TODO: cookingMethods: string[];
        // TODO: cookTime: string | undefined;
        // TODO: dateModified: string | undefined;
        // TODO: description: string | undefined;
        // TODO: headline: string | undefined;
        // TODO: images: ImageObject[];
        // TODO: keywords: string | undefined;
        // TODO: mainEntityOfPage: boolean | undefined;
        // TODO: prepTime: string | undefined;
        // TODO: publisher.logo: ImageObject | undefined;
        // TODO: publisher.url: string | undefined;
        // TODO: reviews: Review[];
        // TODO: totalTime: string | undefined;
    };
}

import * as db from "../../db/recipe";
import * as model from "./model";

export function mapSchemaOrgToDb(recipe: model.Recipe, id: string): db.Recipe {
    const keywords = (recipe.keywords || "")
        .split(",")
        .map(x => x.trim())
        .filter(x => x);

    const authors = recipe.authors
        .filter(x => x.name)
        .map(x => `author: ${x.name}`) as string[];

    const authorUrls = recipe.authors
        .filter(x => x.url)
        .map(x => `author url: ${x.url}`) as string[];

    const tags = new Set([
        ...recipe.recipeCategories,
        ...keywords,
        ...authors,
        ...authorUrls,
    ]);
    if (recipe.publisher && recipe.publisher.name) {
        tags.add(`publisher: ${recipe.publisher.name}`);
    }
    if (recipe.publisher && recipe.publisher.url) {
        tags.add(`publisher url: ${recipe.publisher.url}`);
    }
    if (recipe.datePublished) {
        tags.add(`publish date: ${recipe.datePublished}`);
    }

    return {
        id,
        name: recipe.name || "Imported Recipe",
        url: recipe.url || "",
        description: [recipe.headline, recipe.description]
            .filter(
                x => x && x.toUpperCase() !== (recipe.name || "").toUpperCase()
            )
            .join("\n"),
        tags: Array.from(tags),
        servings: "",
        yield: recipe.recipeYield || "",
        prepTime: recipe.prepTime || "",
        cookTime: recipe.cookTime || "",
        totalTime: recipe.totalTime || "",
        ovenTemperature: "",
        notes: "",
        ingredients: recipe.recipeIngredients.join("\n"),
        directions: recipe.recipeInstructions.join("\n"),
        sourceText: "",
        importWarnings: recipe.warnings,
        // TODO: aggregateRating: AggregateRating | undefined;
        // TODO: cookingMethods: string[];
        // TODO: dateModified: string | undefined;
        // TODO: images: ImageObject[];
        // TODO: mainEntityOfPage: boolean | undefined;
        // TODO: publisher.logo: ImageObject | undefined;
        // TODO: reviews: Review[];
    };
}

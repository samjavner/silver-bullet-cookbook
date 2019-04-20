import { ImportRecipe } from "../model";
import * as model from "./model";

export function mapFromSchemaOrg(recipe: model.Recipe): ImportRecipe {
    return {
        name: recipe.name || "",
        url: recipe.url || "",
        description: [recipe.headline, recipe.description]
            .filter(
                x => x && x.toUpperCase() !== (recipe.name || "").toUpperCase()
            )
            .join("\n"),
        ingredients: recipe.recipeIngredients.join("\n"),
        directions: recipe.recipeInstructions.join("\n"),
        importWarnings: recipe.warnings,
        extras: {
            recipeCategories: recipe.recipeCategories,
            keywords: recipe.keywords
                ? recipe.keywords
                      .split(",")
                      .map(x => x.trim())
                      .filter(x => x)
                : undefined,
            authorNames: recipe.authors
                .filter(x => x.name)
                .map(x => x.name) as string[],
            authorUrls: recipe.authors
                .filter(x => x.url)
                .map(x => x.url) as string[],
            publisherName: recipe.publisher && recipe.publisher.name,
            publisherUrl: recipe.publisher && recipe.publisher.url,
            datePublished: recipe.datePublished,
            recipeYield: recipe.recipeYield,
            prepTime: recipe.prepTime,
            cookTime: recipe.cookTime,
            totalTime: recipe.totalTime,
        },
        // TODO: aggregateRating: AggregateRating | undefined;
        // TODO: cookingMethods: string[];
        // TODO: dateModified: string | undefined;
        // TODO: images: ImageObject[];
        // TODO: mainEntityOfPage: boolean | undefined;
        // TODO: publisher.logo: ImageObject | undefined;
        // TODO: reviews: Review[];
    };
}

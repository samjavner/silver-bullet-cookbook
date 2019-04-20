import { ImportRecipe } from "../model";
import * as parser from "./parser";

export function mapFromPaprika(recipe: parser.Recipe): ImportRecipe {
    return {
        name: recipe.name || "",
        url: recipe.sourceUrl || "",
        description: "",
        ingredients: recipe.ingredients || "",
        directions: recipe.directions || "",
        importWarnings: [],
        extras: {
            categories: recipe.categories,
            difficulty: recipe.difficulty,
            source: recipe.source,
            servings: recipe.servings,
            prepTime: recipe.prepTime,
            cookTime: recipe.cookTime,
            notes: recipe.notes,
        },
        // TODO: created: string | undefined;
        // TODO: rating: number;
        // TODO: nutritionalInfo: string | undefined;
        // TODO: scale: string | undefined;
        // TODO: imageUrl: string | undefined;
        // TODO: photoData: string | undefined;
    };
}

import * as db from "../../db/recipe";
import * as parser from "./parser";

export function mapPaprikaToDb(recipe: parser.Recipe, id: string): db.Recipe {
    const tags = [...recipe.categories];
    if (recipe.source) {
        tags.push(`source: ${recipe.source}`);
    }

    return {
        id,
        name: recipe.name || "Imported Recipe",
        url: recipe.sourceUrl || "",
        description: "",
        tags,
        servings: recipe.servings || "",
        yield: "",
        prepTime: recipe.prepTime || "",
        cookTime: recipe.cookTime || "",
        totalTime: "",
        ovenTemperature: "",
        notes: recipe.notes || "",
        ingredients: recipe.ingredients || "",
        directions: recipe.directions || "",
        sourceText: "",
        importWarnings: [],
        // TODO: created: string | undefined;
        // TODO: difficulty: string | undefined;
        // TODO: rating: number;
        // TODO: nutritionalInfo: string | undefined;
        // TODO: scale: string | undefined;
        // TODO: imageUrl: string | undefined;
        // TODO: photoData: string | undefined;
    };
}

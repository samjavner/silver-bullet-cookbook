import * as db from "../../db/recipe";
import * as parser from "./parser";

export function mapPaprikaToDb(recipe: parser.Recipe, id: string): db.Recipe {
    return {
        id,
        name: recipe.name || "Imported Recipe",
        servings: recipe.servings || "",
        yield: "",
        categories: recipe.categories,
        ingredients: recipe.ingredients || "",
        directions: recipe.directions || "",
        source: recipe.source || "",
        author: "",
        webPage: recipe.sourceUrl || "",
        sourcePageNumber: "",
        copyright: "",
        publisher: "",
        publishDate: "",
        sourceText: "",
        importWarnings: [],
        // TODO: created: string | undefined;
        // TODO: prepTime: string | undefined;
        // TODO: cookTime: string | undefined;
        // TODO: difficulty: string | undefined;
        // TODO: rating: number;
        // TODO: notes: string | undefined;
        // TODO: nutritionalInfo: string | undefined;
        // TODO: scale: string | undefined;
        // TODO: imageUrl: string | undefined;
        // TODO: photoData: string | undefined;
    };
}

import * as db from "../../db/recipe";
import * as model from "./model";

export function mapFdxToDb(
    recipe: model.Recipe,
    fdx: model.Fdx,
    id: string
): db.Recipe {
    const tags = [...recipe.recipeTypes];
    if (recipe.source) {
        tags.push(`source: ${recipe.source}`);
    }
    if (recipe.author) {
        tags.push(`author: ${recipe.author}`);
    }
    if (recipe.sourcePageNumber) {
        tags.push(`page: ${recipe.sourcePageNumber}`);
    }
    if (recipe.copyright) {
        tags.push(`copyright: ${recipe.copyright}`);
    }

    return {
        id,
        name: recipe.name || "Imported Recipe",
        url: recipe.webPage || "",
        description: "",
        tags,
        servings: recipe.servings ? recipe.servings.toString() : "",
        yield: recipe.yield || "",
        prepTime: "",
        cookTime: "",
        totalTime: "",
        ovenTemperature: "",
        notes: "",
        ingredients: recipe.ingredients.map(mapRecipeIngredient).join("\n"),
        directions: recipe.procedures.map(mapRecipeProcedure).join("\n"),
        sourceText: "",
        importWarnings: [],
        // TODO: Recipe.id: number;
        // TODO: Recipe.cookbookChapterId: number | undefined;
        // TODO: Recipe.createDate: string;
        // TODO: Recipe.cookbookId: number | undefined;
        // TODO: Recipe.preparationTime: number | undefined;
        // TODO: Recipe.cookingTime: number | undefined;
        // TODO: Recipe.inactiveTime: number | undefined;
        // TODO: Recipe.readyInTime: number | undefined;
        // TODO: Recipe.ovenTemperatureF: number | undefined;
        // TODO: Recipe.ovenTemperatureC: number | undefined;
        // TODO: Recipe.degreeOfDifficulty: number | undefined;
        // TODO: Recipe.comments: string | undefined;
        // TODO: Recipe.userData1: string | undefined;
        // TODO: Recipe.userData2: string | undefined;
        // TODO: Recipe.userData3: string | undefined;
        // TODO: Recipe.userData4: string | undefined;
        // TODO: Recipe.userData5: string | undefined;
        // TODO: Recipe.userData6: number | undefined;
        // TODO: Recipe.userData7: number | undefined;
        // TODO: Recipe.userData8: number | undefined;
        // TODO: Recipe.userData9: number | undefined;
        // TODO: Recipe.userData10: number | undefined;
        // TODO: Recipe.userData11: string | undefined;
        // TODO: Recipe.userData12: string | undefined;
        // TODO: Recipe.userData13: string | undefined;
        // TODO: Recipe.userData14: string | undefined;
        // TODO: Recipe.userData15: string | undefined;
        // TODO: Recipe.colorFlag: string | undefined;
        // TODO: Recipe.nutrition: RecipeNutrition | undefined;
        // TODO: Recipe.tips: RecipeTip[];
        // TODO: Recipe.reviews: RecipeReview[];
        // TODO: Recipe.authorNotes: RecipeAuthorNote[];
        // TODO: Recipe.measures: RecipeMeasure[];
        // TODO: Recipe.image: Media | undefined;
        // TODO: Recipe.images: Media[];
        // TODO: Recipe.media: Media[];
        // TODO: Recipe.attachments: Media[];
        // TODO: Recipe.sourceImage: Media | undefined;
        // TODO: RecipeIngredient.linkType: string | undefined;
        // TODO: RecipeIngredient.ingredientId: number | undefined;
        // TODO: RecipeIngredient.ingredientName: string | undefined;
        // TODO: RecipeIngredient.recipeId: number | undefined;
        // TODO: RecipeIngredient.recipeName: string | undefined;
        // TODO: RecipeIngredient.measureId: number | undefined;
        // TODO: RecipeIngredient.measure: string | undefined;
        // TODO: RecipeIngredient.measureQuantity: number | undefined;
        // TODO: RecipeIngredient.measureGramWeight: number | undefined;
        // TODO: RecipeProcedure.image: Media | undefined;
        // TODO: Fdx.source: string;
        // TODO: Fdx.fileVersion: string;
        // TODO: Fdx.date: string;
        // TODO: Fdx.cookbooks: Cookbook[];
        // TODO: Fdx.cookbookChapters: CookbookChapter[];
        // TODO: Fdx.ingredientFolders: IngredientFolder[];
        // TODO: Fdx.ingredients: Ingredient[];
        // TODO: Fdx.warnings: string[]; // recipe-specific warnings ought to be on specific recipes
    };
}

function mapRecipeIngredient(ingredient: model.RecipeIngredient): string {
    const isHeading = ingredient.heading;
    const quantity = ingredient.quantity;
    const unit = ingredient.unit;
    const text = ingredient.ingredient;

    if (isHeading) {
        return text ? `# ${text}` : "";
    }

    return (quantity + " " + (unit + " " + text).trim()).trim();
}

function mapRecipeProcedure(procedure: model.RecipeProcedure): string {
    return procedure.heading
        ? procedure.text
            ? `# ${procedure.text}`
            : ""
        : procedure.text;
}

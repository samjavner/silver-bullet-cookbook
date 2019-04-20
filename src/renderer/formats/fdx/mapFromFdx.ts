import { ImportRecipe } from "../model";
import * as model from "./model";

export function mapFromFdx(recipe: model.Recipe, fdx: model.Fdx): ImportRecipe {
    return {
        name: recipe.name,
        url: recipe.webPage || "",
        description: recipe.comments || "",
        ingredients: recipe.ingredients.map(mapRecipeIngredient).join("\n"),
        directions: recipe.procedures.map(mapRecipeProcedure).join("\n"),
        importWarnings: [],
        extras: {
            recipeTypes: recipe.recipeTypes,
            degreeOfDifficulty:
                recipe.degreeOfDifficulty === undefined
                    ? undefined
                    : recipe.degreeOfDifficulty.toString(),
            colorFlag:
                recipe.colorFlag && recipe.colorFlag !== "<None>"
                    ? recipe.colorFlag
                    : undefined,
            userData1: recipe.userData1,
            userData2: recipe.userData2,
            userData3: recipe.userData3,
            userData4: recipe.userData4,
            userData5: recipe.userData5,
            userData6:
                recipe.userData6 === undefined
                    ? undefined
                    : recipe.userData6.toString(),
            userData7:
                recipe.userData7 === undefined
                    ? undefined
                    : recipe.userData7.toString(),
            userData8:
                recipe.userData8 === undefined
                    ? undefined
                    : recipe.userData8.toString(),
            userData9:
                recipe.userData9 === undefined
                    ? undefined
                    : recipe.userData9.toString(),
            userData10:
                recipe.userData10 === undefined
                    ? undefined
                    : recipe.userData10.toString(),
            userData11: recipe.userData11,
            userData12: recipe.userData12,
            userData13: recipe.userData13,
            userData14: recipe.userData14,
            userData15: recipe.userData15,
            source: recipe.source,
            author: recipe.author,
            sourcePageNumber: recipe.sourcePageNumber,
            copyright: recipe.copyright,
            servings: recipe.servings ? recipe.servings.toString() : undefined,
            yield: recipe.yield,
            preparationTime: formatTime(recipe.preparationTime),
            cookingTime: formatTime(recipe.cookingTime),
            readyInTime: formatTime(recipe.readyInTime),
            ovenTemperatureF: recipe.ovenTemperatureF
                ? `${recipe.ovenTemperatureF}°F`
                : undefined,
            ovenTemperatureC: recipe.ovenTemperatureC
                ? `${recipe.ovenTemperatureC}°C`
                : undefined,
        },
        // TODO: Recipe.id: number;
        // TODO: Recipe.cookbookChapterId: number | undefined;
        // TODO: Recipe.createDate: string;
        // TODO: Recipe.cookbookId: number | undefined;
        // TODO: Recipe.inactiveTime: number | undefined;
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

function formatTime(minutes: number | undefined): string | undefined {
    return minutes === undefined
        ? undefined
        : `${Math.floor(minutes / 60)}:${(
              "0" + (minutes % 60).toString()
          ).slice(-2)}`;
}

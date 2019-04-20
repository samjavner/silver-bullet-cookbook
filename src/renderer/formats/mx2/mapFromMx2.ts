import { ImportRecipe } from "../model";
import * as model from "./model";

export function mapFromMx2(recipe: model.Recipe, mx2: model.Mx2): ImportRecipe {
    return {
        name: recipe.name,
        url: "",
        description: recipe.description || "",
        ingredients: recipe.ingredients.map(mapIngredient).join("\n"),
        directions: recipe.directions
            .map(direction => direction.text)
            .join("\n"),
        importWarnings: [],
        extras: {
            categories: recipe.categories,
            cuisine: recipe.cuisine,
            suggestedWine: recipe.suggestedWine,
            source: recipe.source,
            author: recipe.author,
            copyright: recipe.copyright,
            servings: recipe.servings ? recipe.servings.toString() : undefined,
            yield: recipe.yield
                ? `${recipe.yield.quantity} ${recipe.yield.unit}`
                : undefined,
            preparationTime: recipe.preparationTime,
            totalTime: recipe.totalTime,
            note: recipe.note,
        },
        // TODO: Recipe.image: string | undefined;
        // TODO: Recipe.servingIdeas: string | undefined;
        // TODO: Recipe.alternateTime: AlternateTime | undefined;
        // TODO: Recipe.alternateSource: AlternateSource | undefined;
        // TODO: Recipe.ratings: Rating[];
        // TODO: Recipe.nutrition: string;
        // TODO: Recipe.embeddedRecipes: Recipe[];
        // TODO: Ingredient.nutritionalLink: number | undefined;
        // TODO: Direction.image: string | undefined;
        // TODO: Mx2.source: string;
        // TODO: Mx2.date: string;
        // TODO: Mx2.warnings: string[]; // recipe-specific warnings ought to be on specific recipes
    };
}

function mapIngredient(ingredient: model.Ingredient): string {
    if (ingredient.code === "S") {
        return ingredient.ingredient ? `# ${ingredient.ingredient}` : "";
    }

    const quantity = ingredient.quantity || "";
    const unit = ingredient.unit || "";
    const ingredientText = ingredient.ingredient || "";
    const preparation = ingredient.preparation;

    const text = (quantity + " " + (unit + " " + ingredientText).trim()).trim();

    return preparation ? `${text}; ${preparation}` : text;
}

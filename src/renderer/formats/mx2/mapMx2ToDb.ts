import * as db from "../../db/recipe";
import * as model from "./model";

export function mapMx2ToDb(
    recipe: model.Recipe,
    mx2: model.Mx2,
    id: string
): db.Recipe {
    const tags = [...recipe.categories];
    if (recipe.cuisine) {
        tags.push(`cuisine: ${recipe.cuisine}`);
    }
    if (recipe.suggestedWine) {
        tags.push(`wine: ${recipe.suggestedWine}`);
    }
    if (recipe.source) {
        tags.push(`source: ${recipe.source}`);
    }
    if (recipe.author) {
        tags.push(`author: ${recipe.author}`);
    }
    if (recipe.copyright) {
        tags.push(`copyright: ${recipe.copyright}`);
    }

    return {
        id,
        name: recipe.name || "Imported Recipe",
        url: "",
        description: recipe.description || "",
        tags,
        servings: recipe.servings ? recipe.servings.toString() : "",
        yield: recipe.yield
            ? `${recipe.yield.quantity} ${recipe.yield.unit}`
            : "",
        prepTime: recipe.preparationTime || "",
        cookTime: "",
        totalTime: recipe.totalTime || "",
        ovenTemperature: "",
        notes: recipe.note || "",
        ingredients: recipe.ingredients.map(mapIngredient).join("\n"),
        directions: recipe.directions
            .map(direction => direction.text)
            .join("\n"),
        sourceText: "",
        importWarnings: [],
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

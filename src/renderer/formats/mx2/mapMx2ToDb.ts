import * as db from "../../db/recipe";
import * as model from "./model";

export function mapMx2ToDb(
    recipe: model.Recipe,
    mx2: model.Mx2,
    id: string
): db.Recipe {
    return {
        id,
        name: recipe.name || "Imported Recipe",
        servings: recipe.servings ? recipe.servings.toString() : "",
        yield: recipe.yield
            ? `${recipe.yield.quantity} ${recipe.yield.unit}`
            : "",
        categories: recipe.categories,
        ingredients: recipe.ingredients.map(mapIngredient).join("\n"),
        directions: recipe.directions
            .map(direction => direction.text)
            .join("\n"),
        source: recipe.source || "",
        author: recipe.author,
        webPage: "",
        sourcePageNumber: "",
        copyright: recipe.copyright || "",
        publisher: "",
        publishDate: "",
        sourceText: "",
        importWarnings: [],
        // TODO: Recipe.description: string | undefined;
        // TODO: Recipe.image: string | undefined;
        // TODO: Recipe.note: string | undefined;
        // TODO: Recipe.cuisine: string | undefined;
        // TODO: Recipe.servingIdeas: string | undefined;
        // TODO: Recipe.preparationTime: string | undefined;
        // TODO: Recipe.totalTime: string | undefined;
        // TODO: Recipe.alternateTime: AlternateTime | undefined;
        // TODO: Recipe.alternateSource: AlternateSource | undefined;
        // TODO: Recipe.suggestedWine: string | undefined;
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

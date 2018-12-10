import * as AdmZip from "adm-zip";
import * as zlib from "zlib";

export interface Recipe {
    /**
     * Name of recipe.
     */
    name: string | undefined;

    /**
     * Date created.
     *
     * Expected format is "YYYY-MM-DD hh:mm:ss""
     */
    created: string | undefined;

    /**
     * Prep time (free-form text).
     */
    prepTime: string | undefined;

    /**
     * Cook time (free-form text).
     */
    cookTime: string | undefined;

    /**
     * Recipe yield (free-form text).
     */
    servings: string | undefined;

    /**
     * List of categories.
     */
    categories: string[];

    /**
     * Difficulty.
     *
     * Suggested values are "Easy", "Medium", and "Hard".
     */
    difficulty: string | undefined;

    /**
     * Star rating.
     *
     * Expected values are 0, 1, 2, 3, 4, or 5. 0 corresponds to not rated.
     */
    rating: number;

    /**
     * Source.
     */
    source: string | undefined;

    /**
     * Source URL.
     */
    sourceUrl: string | undefined;

    /**
     * Ingredients (may contain newlines).
     */
    ingredients: string | undefined;

    /**
     * Directions (may contain newlines).
     */
    directions: string | undefined;

    /**
     * Notes (may contain newlines).
     */
    notes: string | undefined;

    /**
     * Nutrition (may contain newlines).
     */
    nutritionalInfo: string | undefined;

    /**
     * Scale (fractional value, undefined or "1/1" expected for unscaled recipe).
     */
    scale: string | undefined;

    /**
     * Image URL (not visible in UI).
     */

    imageUrl: string | undefined;

    /**
     * Encoded image data.
     */
    photoData: string | undefined;
}

export function parseFile(path: string | Buffer): Recipe[] {
    const recipes: Recipe[] = [];

    const recipesZip =
        typeof path === "string" ? new AdmZip(path) : new AdmZip(path);

    const recipesEntries = recipesZip.getEntries();
    recipesEntries.forEach(recipesEntry => {
        if (recipesEntry.name.endsWith(".paprikarecipe")) {
            const data = recipesEntry.getData();
            const recipeData = zlib.unzipSync(data).toString();
            const recipeObj = JSON.parse(recipeData);
            const recipe = parseRecipe(recipeObj);
            recipes.push(recipe);
        }
    });

    return recipes;
}

export function parseRecipe(recipe: { [key: string]: unknown }): Recipe {
    return {
        name: typeof recipe.name === "string" ? recipe.name : undefined,
        created:
            typeof recipe.created === "string" ? recipe.created : undefined,
        prepTime:
            typeof recipe.prep_time === "string" ? recipe.prep_time : undefined,
        cookTime:
            typeof recipe.cook_time === "string" ? recipe.cook_time : undefined,
        servings:
            typeof recipe.servings === "string" ? recipe.servings : undefined,
        categories:
            recipe.categories instanceof Array
                ? recipe.categories.filter(
                      category => typeof category === "string"
                  )
                : [],
        difficulty:
            typeof recipe.difficulty === "string"
                ? recipe.difficulty
                : undefined,
        rating: typeof recipe.rating === "number" ? recipe.rating : 0,
        sourceUrl:
            typeof recipe.source_url === "string"
                ? recipe.source_url
                : undefined,
        source: typeof recipe.source === "string" ? recipe.source : undefined,
        ingredients:
            typeof recipe.ingredients === "string"
                ? recipe.ingredients
                : undefined,
        directions:
            typeof recipe.directions === "string"
                ? recipe.directions
                : undefined,
        notes: typeof recipe.notes === "string" ? recipe.notes : undefined,
        nutritionalInfo:
            typeof recipe.nutritional_info === "string"
                ? recipe.nutritional_info
                : undefined,
        scale: typeof recipe.scale === "string" ? recipe.scale : undefined,
        imageUrl:
            typeof recipe.image_url === "string" ? recipe.image_url : undefined,
        photoData:
            typeof recipe.photo_data === "string"
                ? recipe.photo_data
                : undefined,
    };
}

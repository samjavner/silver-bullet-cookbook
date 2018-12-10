export interface Mx2 {
    /**
     * Source software (e.g. "MasterCook", "Living Cookbook 4.0")
     */
    source: string;

    /**
     * Export date (e.g. MasterCook exports "December 09, 2018", Living Cookbook exports "2018-12-09")
     */
    date: string;

    /**
     * Names of all the recipes (non-embedded recipes only).
     */
    names: string[];

    /**
     * List of recipes
     */
    recipes: Recipe[];

    /**
     * List of parser warnings.
     */
    warnings: string[];
}

export interface Recipe {
    /**
     * Title of recipe.
     */
    name: string;

    /**
     * Description.
     */
    description: string | undefined;

    /**
     * Number of servings.
     */
    servings: number | undefined;

    /**
     * Yield.
     */
    yield: Yield | undefined;

    /**
     * Name of image file (in mz2 archive).
     */
    image: string | undefined;

    /**
     * Notes.
     */
    note: string | undefined;

    /**
     * Cuisine.
     */
    cuisine: string | undefined;

    /**
     * List of categories.
     */
    categories: string[];

    /**
     * Serving ideas.
     */
    servingIdeas: string | undefined;

    /**
     * Preparation time (formatted as H:MM).
     */
    preparationTime: string | undefined;

    /**
     * Total time (Start to Finish, formatted as H:MM).
     */
    totalTime: string | undefined;

    /**
     * Alternate (custom) time.
     */
    alternateTime: AlternateTime | undefined;

    /**
     * Author.
     */
    author: string;

    /**
     * Source.
     */
    source: string | undefined;

    /**
     * Copyright.
     */
    copyright: string | undefined;

    /**
     * Alternate (custom) source.
     */
    alternateSource: AlternateSource | undefined;

    /**
     * Suggested wine.
     */
    suggestedWine: string | undefined;

    /**
     * List of ingredients.
     */
    ingredients: Ingredient[];

    /**
     * List of directions
     */
    directions: Direction[];

    /**
     * List of ratings.
     */
    ratings: Rating[];

    /**
     * Nutritional information (read-only in MasterCook).
     */
    nutrition: string;

    /**
     * List of embedded recipes.
     */
    embeddedRecipes: Recipe[];
}

export interface Yield {
    /**
     * Quantity.
     */
    quantity: number;

    /**
     * Unit.
     */
    unit: string;
}

export interface AlternateTime {
    /**
     * Label for custom time measurement.
     */
    label: string;

    /**
     * Required time (formatted as H:MM).
     */
    elapsed: string | undefined;
}

export interface AlternateSource {
    /**
     * Label for custom source.
     */
    label: string;

    /**
     * Value of custom source.
     */
    source: string;
}

export interface Ingredient {
    /**
     * Type of ingredient line.
     *
     * I - Ingredient
     * S - Subtitle
     * R - Recipe
     * T - Text
     */
    code: string;

    /**
     * Quantity.
     *
     * This is a fraction or mixed number in a genuine MasterCook export, but otherwise could be anything.
     */
    quantity: string | undefined;

    /**
     * Unit.
     */
    unit: string | undefined;

    /**
     * Name/text of ingredient.
     */
    ingredient: string | undefined;

    /**
     * Preparation details (follows the ingredient text).
     */
    preparation: string | undefined;

    /**
     * Nutritional link.
     */
    nutritionalLink: number | undefined;
}

export interface Direction {
    /**
     * Text of direction.
     */
    text: string | undefined;

    /**
     * Name of image file (in mz2 archive).
     */
    image: string | undefined;
}

export interface Rating {
    /**
     * Name of rating.
     */
    name: string;

    /**
     * Value of rating (integer 0-10).
     */
    value: number;
}

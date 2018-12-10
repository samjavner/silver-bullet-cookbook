// TODO: Menu, Meal, Glossary item, Technique, Grocery list, Inventory item, Store, Saved web page, RSS feed, Search

export interface Fdx {
    /**
     * Source software of recipes (e.g. "Living Cookbook 4.0").
     */
    source: string;

    /**
     * File version (e.g. "2.0").
     */
    fileVersion: string;

    /**
     * Creation date in YYYY-MM-DD format.
     */
    date: string;

    /**
     * List of cookbooks.
     */
    cookbooks: Cookbook[];

    /**
     * List of cookbook chapters.
     */
    cookbookChapters: CookbookChapter[];

    /**
     * List of recipes.
     */
    recipes: Recipe[];

    /**
     * List of ingredient folders.
     */
    ingredientFolders: IngredientFolder[];

    /**
     * List of ingredients.
     */
    ingredients: Ingredient[];

    /**
     * List of parser warnings.
     */
    warnings: string[];
}

export interface Cookbook {
    /**
     * Id of cookbook.
     */
    id: number;

    /**
     * Cookbook name.
     */
    name: string;

    /**
     * Comments.
     */
    comments: string | undefined;

    /**
     * Autoarchive rules.
     */
    autoArchiveRules: AutoArchiveRule[];
}

export interface CookbookChapter {
    /**
     * Id of cookbook chapter.
     */
    id: number;

    /**
     * Id of containing cookbook.
     */
    cookbookId: number;

    /**
     * Id of containing chapter (or undefined if it is a top level chapter).
     */
    parentChapterId: number | undefined;

    /**
     * Chapter name.
     */
    name: string;

    /**
     * Comments.
     */
    comments: string | undefined;

    /**
     * Autoarchive rules.
     */
    autoArchiveRules: AutoArchiveRule[];
}

export interface Recipe {
    /**
     * Id of recipe.
     */
    id: number;

    /**
     * Recipe name.
     */
    name: string;

    /**
     * Id of containing cookbook chapter (undefined when in the cookbook top level and not a particular chapter).
     */
    cookbookChapterId: number | undefined;

    /**
     * Creation date in YYYY-MM-DD format.
     */
    createDate: string;

    /**
     * Id of containing cookbook.
     */
    cookbookId: number | undefined;

    /**
     * Servings (should be an integer).
     */
    servings: number | undefined;

    /**
     * Yield.
     */
    yield: string | undefined;

    /**
     * List of recipe types.
     *
     * If a custom recipe type has commas, it will be split into multiple recipe types as the
     * list is stored in comma delimited fashion. Therefore there is not an easy way to disambiguate
     * without the user supplying additional information about their custom recipe types.
     */
    recipeTypes: string[];

    /**
     * Preparation time (in minutes).
     */
    preparationTime: number | undefined;

    /**
     * Cooking time (in minutes).
     */
    cookingTime: number | undefined;

    /**
     * Inactive time (in minutes).
     */
    inactiveTime: number | undefined;

    /**
     * Ready in time (in minutes).
     */
    readyInTime: number | undefined;

    /**
     * Oven temperature (°F). Only one of the temperatures is editable — the other value is derived.
     */
    ovenTemperatureF: number | undefined;

    /**
     * Oven temperature (°C). Only one of the temperatures is editable — the other value is derived.
     */
    ovenTemperatureC: number | undefined;

    /**
     * Difficulty.
     *
     * 1 - Very Easy
     * 2 - Easy
     * 3 - Moderately Difficult
     * 4 - Difficult
     * 5 - Very Difficult
     */
    degreeOfDifficulty: number | undefined;

    /**
     * Comments.
     */
    comments: string | undefined;

    /**
     * Author.
     */
    author: string | undefined;

    /**
     * Source.
     */
    source: string | undefined;

    /**
     * Source page number.
     */
    sourcePageNumber: string | undefined;

    /**
     * Source webpage.
     */
    webPage: string | undefined;

    /**
     * Source copyright.
     */
    copyright: string | undefined;

    /**
     * User data 1 (text).
     */
    userData1: string | undefined;

    /**
     * User data 2 (text).
     */
    userData2: string | undefined;

    /**
     * User data 3 (text).
     */
    userData3: string | undefined;

    /**
     * User data 4 (text).
     */
    userData4: string | undefined;

    /**
     * User data 5 (text).
     */
    userData5: string | undefined;

    /**
     * User data 6 (numeric).
     */
    userData6: number | undefined;

    /**
     * User data 7 (numeric).
     */
    userData7: number | undefined;

    /**
     * User data 8 (numeric).
     */
    userData8: number | undefined;

    /**
     * User data 9 (numeric).
     */
    userData9: number | undefined;

    /**
     * User data 10 (numeric).
     */
    userData10: number | undefined;

    /**
     * User data 11 (link).
     */
    userData11: string | undefined;

    /**
     * User data 12 (link).
     */
    userData12: string | undefined;

    /**
     * User data 13 (link).
     */
    userData13: string | undefined;

    /**
     * User data 14 (link).
     */
    userData14: string | undefined;

    /**
     * User data 15 (link).
     */
    userData15: string | undefined;

    /**
     * Recipe flag color.
     *
     * Valid values are: "<None>", "Red", "Blue", "Yellow", "Green", "Orange", "Purple".
     */
    colorFlag: string | undefined;

    /**
     * List of ingredients.
     */
    ingredients: RecipeIngredient[];

    /**
     * List of procedures.
     */
    procedures: RecipeProcedure[];

    /**
     * Nutrition.
     */
    nutrition: RecipeNutrition | undefined;

    /**
     * List of tips.
     */
    tips: RecipeTip[];

    /**
     * List of reviews.
     */
    reviews: RecipeReview[];

    /**
     * List of source author notes.
     */
    authorNotes: RecipeAuthorNote[];

    /**
     * List of measures.
     */
    measures: RecipeMeasure[];

    /**
     * Primary image (images property is more fully filled out).
     */
    image: Media | undefined;

    /**
     * List of images.
     */
    images: Media[];

    /**
     * List of videos.
     */
    media: Media[];

    /**
     * List of attachments.
     */
    attachments: Media[];

    /**
     * Source image.
     */
    sourceImage: Media | undefined;
}

export interface RecipeIngredient {
    /**
     * Quantity (user is not forced to enter a number).
     */
    quantity: string;

    /**
     * Unit (user interface provides suggestions).
     */
    unit: string;

    /**
     * Ingredient text.
     */
    ingredient: string;

    /**
     * True if the ingredient is a heading, false if it is an ingredient.
     */
    heading: boolean;

    /**
     * Link type (if an ingredient, not a heading).
     *
     * Valid values are: "Unlinked", "Ingredient", "Recipe".
     */
    linkType: string | undefined;

    /**
     * Id of ingredient (if linkType is "Ingredient").
     */
    ingredientId: number | undefined;

    /**
     * Name of ingredient (if linkType is "Ingredient").
     */
    ingredientName: string | undefined;

    /**
     * Id of recipe (if linkType is "Recipe").
     */
    recipeId: number | undefined;

    /**
     * Name of recipe (if linkType is "Recipe").
     */
    recipeName: string | undefined;

    /**
     * Id of measure.
     */
    measureId: number | undefined;

    /**
     * Description of measure.
     */
    measure: string | undefined;

    /**
     * Quantity of measure.
     */
    measureQuantity: number | undefined;

    /**
     * Gram weight of measure.
     */
    measureGramWeight: number | undefined;
}

export interface RecipeProcedure {
    /**
     * True if the procedure is a heading, false if it is a procedure.
     */
    heading: boolean;

    /**
     * Procedure text.
     */
    text: string;

    /**
     * Procedure image.
     */
    image: Media | undefined;
}

export interface RecipeNutrition extends Nutrition {
    /**
     * Serving size (e.g. "1 Serving" but user can customize).
     */
    servingSize: string;

    /**
     * True when nutritionCalculationMode is "Automatic", false otherwise.
     */
    calculatedFromRecipeFlag: boolean;

    /**
     * Nutrition calculation mode.
     *
     * Valid values are: "Automatic", "Semi-Automatic", "Manual".
     */
    nutritionCalculationMode: string | undefined;
}

export interface RecipeTip {
    /**
     * Tip text.
     */
    text: string;

    /**
     * True if the tip is a heading, false if it is a tip.
     */
    heading: boolean;
}

export interface RecipeReview {
    /**
     * Review text.
     */
    text: string;

    /**
     * Rating.
     *
     * 0 - Never Again
     * 1 - Barely Edible
     * 2 - Not Bad
     * 3 - Liked It
     * 4 - Loved It!
     * 5 - Best Ever!
     */
    rating: number;

    /**
     * Reviewer.
     */
    reviewer: string;

    /**
     * Review date in YYYY-MM-DD format.
     */
    reviewDate: string;
}

export interface RecipeAuthorNote {
    /**
     * Author note text.
     */
    text: string;

    /**
     * True if the tip is a heading, false if it is a tip.
     */
    heading: boolean;
}

export interface RecipeMeasure {
    /**
     * Id of custom recipe measure.
     */
    measureId: number;

    /**
     * Description of measure.
     */
    description: string;

    /**
     * Gram weight.
     */
    gramWeight: number;

    /**
     * Measure type.
     *
     * Valid values are: "Weight (Mass)", "Volume", "Unit".
     */
    measureType: string;
}

export interface IngredientFolder {
    /**
     * Id of ingredient folder.
     */
    id: number;

    /**
     * Folder name.
     */
    name: string;

    /**
     * Id of containing folder (or undefined if it is a top level folder).
     */
    parentFolderId: number | undefined;

    /**
     * Comments.
     */
    comments: string | undefined;

    /**
     * Autoarchive rules.
     */
    autoArchiveRules: AutoArchiveRule[];
}

export interface Ingredient {
    /**
     * Id of ingredient.
     */
    id: number;

    /**
     * Id of containing ingredient folder.
     */
    ingredientFolderId: number;

    /**
     * Ingredient name.
     */
    name: string;

    /**
     * Common name.
     */
    commonName: string;

    /**
     * Creation date in YYYY-MM-DD format. (Can be 0001-01-01 for pre-loaded ingredients.)
     */
    createDate: string | undefined;

    /**
     * Comments.
     */
    comments: string | undefined;

    /**
     * Source.
     */
    source: string | undefined;

    /**
     * Source webpage.
     */
    webPage: string | undefined;

    /**
     * Source copyright.
     */
    copyright: string | undefined;

    /**
     * User data 1 (text).
     */
    userData1: string | undefined;

    /**
     * User data 2 (text).
     */
    userData2: string | undefined;

    /**
     * User data 3 (text).
     */
    userData3: string | undefined;

    /**
     * User data 4 (text).
     */
    userData4: string | undefined;

    /**
     * User data 5 (text).
     */
    userData5: string | undefined;

    /**
     * User data 6 (numeric).
     */
    userData6: number | undefined;

    /**
     * User data 7 (numeric).
     */
    userData7: number | undefined;

    /**
     * User data 8 (numeric).
     */
    userData8: number | undefined;

    /**
     * User data 9 (numeric).
     */
    userData9: number | undefined;

    /**
     * User data 10 (numeric).
     */
    userData10: number | undefined;

    /**
     * User data 11 (link).
     */
    userData11: string | undefined;

    /**
     * User data 12 (link).
     */
    userData12: string | undefined;

    /**
     * User data 13 (link).
     */
    userData13: string | undefined;

    /**
     * User data 14 (link).
     */
    userData14: string | undefined;

    /**
     * User data 15 (link).
     */
    userData15: string | undefined;

    /**
     * Recipe flag color.
     *
     * Valid values are: "<None>", "Red", "Blue", "Yellow", "Green", "Orange", "Purple".
     */
    colorFlag: string | undefined;

    /**
     * List of measures.
     */
    measures: IngredientMeasure[];

    /**
     * Nutrition.
     */
    nutrition: IngredientNutrition | undefined;

    /**
     * List of notes.
     */
    notes: IngredientNote[];

    /**
     * Primary image (images property is more fully filled out).
     */
    image: Media | undefined;

    /**
     * List of images.
     */
    images: Media[];

    /**
     * List of attachments.
     */
    attachments: Media[];

    /**
     * Source image.
     */
    sourceImage: Media | undefined;

    /**
     * Grocery aisle.
     *
     * Not always present in exported recipes.
     */
    groceryAisle: string | undefined;
}

export interface IngredientMeasure {
    /**
     * Id of custom recipe measure.
     */
    measureId: number;

    /**
     * Description of measure.
     */
    description: string;

    /**
     * Gram weight.
     */
    gramWeight: number;

    /**
     * Measure type.
     *
     * Valid values are: "Weight (Mass)", "Volume", "Unit".
     */
    measureType: string;

    /**
     * Measure cost.
     */
    measureCost: number | undefined;
}

export interface IngredientNutrition extends Nutrition {
    /**
     * Serving size (to be multiplied by serving size measure).
     */
    servingSize: number;

    /**
     * Serving size measure id.
     */
    servingSizeMeasureId: number;

    /**
     * Nutrition source (e.g. "USDA SR-23")
     */
    nutritionSource: string;

    /**
     * Default measure id.
     */
    defaultMeasureId: number | undefined;

    /**
     * Nutrition calculation mode.
     *
     * Valid values are: "Semi-Automatic", "Manual".
     */
    nutritionCalculationMode: string | undefined;
}

export interface IngredientNote {
    /**
     * Note text.
     */
    text: string;

    /**
     * True if the note is a heading, false if it is a note.
     */
    heading: boolean;
}

export interface AutoArchiveRule {
    /**
     * Attribute.
     *
     * Valid values for recipe are: "Recipe Name", "Comments", "Recipe Type", "Ingredients", "Procedure", "Author", "Source", "Webpage".
     * Valid values for ingredient are: "Ingredient Name", "Common Name", "Source", "Webpage".
     */
    attribute: string;

    /**
     * Type.
     *
     * Valid values are: "Standard", "Regular Expression".
     */
    expressionType: string;

    /**
     * Expression.
     */
    expression: string;
}

export interface Nutrition {
    /**
     * Calories (in kCal).
     */
    calories: number | undefined;

    /**
     * Energy (in kJ).
     */
    energy: number | undefined;

    /**
     * Total fat (in g).
     */
    totalFat: number | undefined;

    /**
     * Saturated fat (in g).
     */
    saturatedFat: number | undefined;

    /**
     * Saturated fatty acid 4:0 (in g).
     */
    saturatedFattyAcid4_0: number | undefined;

    /**
     * Saturated fatty acid 6:0 (in g).
     */
    saturatedFattyAcid6_0: number | undefined;

    /**
     * Saturated fatty acid 8:0 (in g).
     */
    saturatedFattyAcid8_0: number | undefined;

    /**
     * Saturated fatty acid 10:0 (in g).
     */
    saturatedFattyAcid10_0: number | undefined;

    /**
     * Saturated fatty acid 12:0 (in g).
     */
    saturatedFattyAcid12_0: number | undefined;

    /**
     * Saturated fatty acid 13:0 (in g).
     */
    saturatedFattyAcid13_0: number | undefined;

    /**
     * Saturated fatty acid 14:0 (in g).
     */
    saturatedFattyAcid14_0: number | undefined;

    /**
     * Saturated fatty acid 15:0 (in g).
     */
    saturatedFattyAcid15_0: number | undefined;

    /**
     * Saturated fatty acid 16:0 (in g).
     */
    saturatedFattyAcid16_0: number | undefined;

    /**
     * Saturated fatty acid 17:0 (in g).
     */
    saturatedFattyAcid17_0: number | undefined;

    /**
     * Saturated fatty acid 18:0 (in g).
     */
    saturatedFattyAcid18_0: number | undefined;

    /**
     * Saturated fatty acid 20:0 (in g).
     */
    saturatedFattyAcid20_0: number | undefined;

    /**
     * Saturated fatty acid 22:0 (in g).
     */
    saturatedFattyAcid22_0: number | undefined;

    /**
     * Saturated fatty acid 24:0 (in g).
     */
    saturatedFattyAcid24_0: number | undefined;

    /**
     * Monounsatured fat (in g).
     */
    monounsaturatedFat: number | undefined;

    /**
     * Monounsatured fatty acid 14:1 (in g).
     */
    monounsaturatedFattyAcid14_1: number | undefined;

    /**
     * Monounsatured fatty acid 15:1 (in g).
     */
    monounsaturatedFattyAcid15_1: number | undefined;

    /**
     * Monounsatured fatty acid 16:1 (in g).
     */
    monounsaturatedFattyAcid16_1: number | undefined;

    /**
     * Monounsatured fatty acid 17:1 (in g).
     */
    monounsaturatedFattyAcid17_1: number | undefined;

    /**
     * Monounsatured fatty acid 18:1 (in g).
     */
    monounsaturatedFattyAcid18_1: number | undefined;

    /**
     * Monounsatured fatty acid 20:1 (in g).
     */
    monounsaturatedFattyAcid20_1: number | undefined;

    /**
     * Monounsatured fatty acid 22:1 (in g).
     */
    monounsaturatedFattyAcid22_1: number | undefined;

    /**
     * Monounsatured fatty acid 24:1 (in g).
     */
    monounsaturatedFattyAcid24_1: number | undefined;

    /**
     * Polyunsaturated fat (in g).
     */
    polyunsaturatedFat: number | undefined;

    /**
     * Polyunsatured fatty acid 18:2 (in g).
     */
    polyunsaturatedFattyAcid18_2: number | undefined;

    /**
     * Polyunsatured fatty acid 18:3 (in g).
     */
    polyunsaturatedFattyAcid18_3: number | undefined;

    /**
     * Polyunsatured fatty acid 18:4 (in g).
     */
    polyunsaturatedFattyAcid18_4: number | undefined;

    /**
     * Polyunsatured fatty acid 20:3 (in g).
     */
    polyunsaturatedFattyAcid20_3: number | undefined;

    /**
     * Polyunsatured fatty acid 20:4 (in g).
     */
    polyunsaturatedFattyAcid20_4: number | undefined;

    /**
     * Polyunsatured fatty acid 21:5 (in g).
     */
    polyunsaturatedFattyAcid21_5: number | undefined;

    /**
     * Polyunsatured fatty acid 22:4 (in g).
     */
    polyunsaturatedFattyAcid22_4: number | undefined;

    /**
     * Omega-3 fatty acids (in g).
     */
    omega3FattyAcids: number | undefined;

    /**
     * Alpha linolenic acid (in g).
     */
    alphaLinolenicAcid: number | undefined;

    /**
     * Eicosapentaenoic acid (in g).
     */
    eicosapentaenoicAcid: number | undefined;

    /**
     * Docosapentaenoic acid (in g).
     */
    docosapentaenoicAcid: number | undefined;

    /**
     * Docosahexaenoic acid (in g).
     */
    docosahexaenoicAcid: number | undefined;

    /**
     * Omega-6 fatty acids (in g).
     */
    omega6FattyAcids: number | undefined;

    /**
     * Linoleic acid (in g).
     */
    linoleicAcid: number | undefined;

    /**
     * Gamma linolenic acid (in g).
     */
    gammaLinolenicAcid: number | undefined;

    /**
     * Eicosadienoic acid (in g).
     */
    eicosadienoicAcid: number | undefined;

    /**
     * Dihomo gamma linolenic acid (in g).
     */
    dihomoGammaLinolenicAcid: number | undefined;

    /**
     * Arachidonic acid (in g).
     */
    arachidonicAcid: number | undefined;

    /**
     * Trans fatty acids (in g).
     */
    transFattyAcids: number | undefined;

    /**
     * Trans-monoenoic fatty acids (in g).
     */
    transMonoenoicFattyAcids: number | undefined;

    /**
     * Trans-polyenoic fatty acids (in g).
     */
    transPolyenoicFattyAcids: number | undefined;

    /**
     * Cholesterol (in mg).
     */
    cholesterol: number | undefined;

    /**
     * Phytosterols (in mg).
     */
    phytosterols: number | undefined;

    /**
     * Beta sitosterol (in mg).
     */
    betaSitosterol: number | undefined;

    /**
     * Stigmasterol (in mg).
     */
    stigmasterol: number | undefined;

    /**
     * Campesterol (in mg).
     */
    campesterol: number | undefined;

    /**
     * Sodium (in mg).
     */
    sodium: number | undefined;

    /**
     * Potassium (in mg).
     */
    potassium: number | undefined;

    /**
     * Total carbohydrates (in g).
     */
    totalCarbohydrate: number | undefined;

    /**
     * Fiber (in g).
     */
    fiber: number | undefined;

    /**
     * Starch (in g).
     */
    starch: number | undefined;

    /**
     * Sugar (in g).
     */
    sugar: number | undefined;

    /**
     * Sucrose (in g).
     */
    sucrose: number | undefined;

    /**
     * Glucose (in g).
     */
    glucose: number | undefined;

    /**
     * Fructose (in g).
     */
    fructose: number | undefined;

    /**
     * Lactose (in g).
     */
    lactose: number | undefined;

    /**
     * Maltose (in g).
     */
    maltose: number | undefined;

    /**
     * Galactose (in g).
     */
    galactose: number | undefined;

    /**
     * Sugar alcohols (in g).
     */
    sugarAlcohols: number | undefined;

    /**
     * Protein (in g).
     */
    protein: number | undefined;

    /**
     * Vitamin A (in IU).
     */
    vitaminA: number | undefined;

    /**
     * Retinol (in mcg).
     */
    retinol: number | undefined;

    /**
     * Beta carotene (in mcg).
     */
    betaCarotene: number | undefined;

    /**
     * Alpha carotene (in mcg).
     */
    alphaCarotene: number | undefined;

    /**
     * Beta cryptoxanthin (in mcg).
     */
    betaCryptoxanthin: number | undefined;

    /**
     * Lycopene (in mcg).
     */
    lycopene: number | undefined;

    /**
     * Vitamin C (in mg).
     */
    vitaminC: number | undefined;

    /**
     * Calcium (in mg).
     */
    calcium: number | undefined;

    /**
     * Iron (in mg).
     */
    iron: number | undefined;

    /**
     * Vitamin E (in mg).
     */
    vitaminE: number | undefined;

    /**
     * Beta tocopherol (in mg).
     */
    betaTocopherol: number | undefined;

    /**
     * Gamma tocopherol (in mg).
     */
    gammaTocopherol: number | undefined;

    /**
     * Delta tocopherol (in mg).
     */
    deltaTocopherol: number | undefined;

    /**
     * Vitamin D (in IU).
     */
    vitaminD: number | undefined;

    /**
     * Thiamin (in mg).
     */
    thiamin: number | undefined;

    /**
     * Riboflavin (in mg).
     */
    riboflavin: number | undefined;

    /**
     * Niacin (in mg).
     */
    niacin: number | undefined;

    /**
     * Vitamin B6 (in mg).
     */
    vitaminB6: number | undefined;

    /**
     * Folate (in mcg).
     */
    folate: number | undefined;

    /**
     * Vitamin B12 (in mcg).
     */
    vitaminB12: number | undefined;

    /**
     * Pantothenic acid (in mg).
     */
    pantothenicAcid: number | undefined;

    /**
     * Vitamin K (in mcg).
     */
    vitaminK: number | undefined;

    /**
     * Phosphorus (in mg).
     */
    phosphorus: number | undefined;

    /**
     * Magnesium (in mg).
     */
    magnesium: number | undefined;

    /**
     * Zinc (in mg).
     */
    zinc: number | undefined;

    /**
     * Copper (in mg).
     */
    copper: number | undefined;

    /**
     * Manganese (in mg).
     */
    manganese: number | undefined;

    /**
     * Selenium (in mcg).
     */
    selenium: number | undefined;

    /**
     * Biotin (in mcg).
     */
    biotin: number | undefined;

    /**
     * Chromium (in mcg).
     */
    chromium: number | undefined;

    /**
     * Fluoride (in mg).
     */
    fluoride: number | undefined;

    /**
     * Iodine (in mcg).
     */
    iodine: number | undefined;

    /**
     * Molybdenum (in mcg).
     */
    molybdenum: number | undefined;

    /**
     * Chloride (in g).
     */
    chloride: number | undefined;

    /**
     * Choline (in mg).
     */
    choline: number | undefined;

    /**
     * Tryptophan (in g).
     */
    tryptophan: number | undefined;

    /**
     * Threonine (in g).
     */
    threonine: number | undefined;

    /**
     * Isoleucine (in g).
     */
    isoleucine: number | undefined;

    /**
     * Leucine (in g).
     */
    leucine: number | undefined;

    /**
     * Lysine (in g).
     */
    lysine: number | undefined;

    /**
     * Methionine (in g).
     */
    methionine: number | undefined;

    /**
     * Cystine (in g).
     */
    cystine: number | undefined;

    /**
     * Phenylalanine (in g).
     */
    phenylalanine: number | undefined;

    /**
     * Tyrosine (in g).
     */
    tyrosine: number | undefined;

    /**
     * Valine (in g).
     */
    valine: number | undefined;

    /**
     * Arginine (in g).
     */
    arginine: number | undefined;

    /**
     * Histidine (in g).
     */
    histidine: number | undefined;

    /**
     * Alanine (in g).
     */
    alanine: number | undefined;

    /**
     * Aspartic acid (in g).
     */
    asparticAcid: number | undefined;

    /**
     * Glutamic acid (in g).
     */
    glutamicAcid: number | undefined;

    /**
     * Glycine (in g).
     */
    glycine: number | undefined;

    /**
     * Proline (in g).
     */
    proline: number | undefined;

    /**
     * Serine (in g).
     */
    serine: number | undefined;

    /**
     * Hydroxyproline (in g).
     */
    hydroxyproline: number | undefined;

    /**
     * Alcohol (in g).
     */
    alcohol: number | undefined;

    /**
     * Caffeine (in mg).
     */
    caffeine: number | undefined;

    /**
     * Theobromine (in mg).
     */
    theobromine: number | undefined;

    /**
     * Water (in g).
     */
    water: number | undefined;

    /**
     * Ash (in g).
     */
    ash: number | undefined;

    /**
     * Refuse (in g).
     */
    refuse: number | undefined;

    /**
     * Mass (in g).
     */
    mass: number | undefined;

    /**
     * Volume (in ml).
     */
    volume: number | undefined;

    /**
     * Fat factor.
     */
    fatFactor: number | undefined;

    /**
     * Protein factor.
     */
    proteinFactor: number | undefined;

    /**
     * Carbohydrate factor.
     */
    carbohydrateFactor: number | undefined;

    /**
     * Alcohol factor.
     */
    alcoholFactor: number | undefined;

    /**
     * Calories from fat (in kCal).
     *
     * Not always present in exported recipes.
     */
    caloriesFromFat: number | undefined;
}

export interface Media {
    /**
     * Value of xmlns:dt attribute. Should be: "urn:schemas-microsoft-com:datatypes".
     */
    xmlns_dt: string;

    /**
     * Value of dt:dt attribute. Should be: "bin.base64".
     */
    dt_dt: string;

    /**
     * File type. Don't trust this value — it is undefined or wrong in many cases.
     */
    fileType: string | undefined;

    /**
     * File name.
     */
    fileName: string | undefined;

    /**
     * File description.
     */
    description: string | undefined;

    /**
     * Base 64 encoded content.
     */
    content: string;
}

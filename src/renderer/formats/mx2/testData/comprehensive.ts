import { Mx2, Recipe } from "../model";

const recipe1: Recipe = {
    name: "Recipe with only a name",
    description: undefined,
    servings: undefined,
    yield: undefined,
    image: undefined,
    note: undefined,
    cuisine: undefined,
    categories: [],
    servingIdeas: undefined,
    preparationTime: undefined,
    totalTime: undefined,
    alternateTime: undefined,
    author: "",
    source: undefined,
    copyright: undefined,
    alternateSource: undefined,
    suggestedWine: undefined,
    ingredients: [],
    directions: [],
    ratings: [],
    nutrition:
        "Per Serving (excluding unknown items): 0 Calories; 0g Fat (0.0% calories from fat); 0g Protein; 0g Carbohydrate; 0g Dietary Fiber; 0mg Cholesterol; 0mg Sodium.  Exchanges: .",
    embeddedRecipes: [],
};

const recipe2: Recipe = {
    name: "Recipe with everything filled out, including an embedded recipe",
    description: "Here is a description",
    servings: 42,
    yield: {
        quantity: 5.5,
        unit: "cups",
    },
    image: undefined,
    note: "Here are notes.\n\nOn multiple lines.",
    cuisine: "Cuisine 2",
    categories: ["Category 1", "Category 3"],
    servingIdeas: "Here are serving ideas.\n\nOn multiple lines.",
    preparationTime: "2:50",
    totalTime: "4:44",
    alternateTime: {
        label: "Time 2",
        elapsed: "1:08",
    },
    author: "John Smith",
    source: "The Big Cookbook",
    copyright: "© 1992",
    alternateSource: {
        label: "Source 2",
        source: "On the web",
    },
    suggestedWine: "Cabernet",
    ingredients: [
        {
            code: "S",
            quantity: undefined,
            unit: undefined,
            ingredient: "It's a subtitle!",
            preparation: undefined,
            nutritionalLink: undefined,
        },
        {
            code: "S",
            quantity: undefined,
            unit: undefined,
            ingredient: undefined,
            preparation: undefined,
            nutritionalLink: undefined,
        },
        {
            code: "I",
            quantity: "3/4",
            unit: "pint",
            ingredient: "ingredient that is unknown",
            preparation: undefined,
            nutritionalLink: undefined,
        },
        {
            code: "I",
            quantity: "1 1/2",
            unit: "cups",
            ingredient: "egg bagel",
            preparation: "but cook it",
            nutritionalLink: 3219,
        },
        {
            code: "I",
            quantity: undefined,
            unit: undefined,
            ingredient: undefined,
            preparation: undefined,
            nutritionalLink: undefined,
        },
        {
            code: "R",
            quantity: "1",
            unit: "cup",
            ingredient: "recipe that is unknown",
            preparation: undefined,
            nutritionalLink: undefined,
        },
        {
            code: "R",
            quantity: "2 5/8",
            unit: "tablespoons",
            ingredient: "Recipe with only a name",
            preparation: "prepared first, of course",
            nutritionalLink: undefined,
        },
        {
            code: "R",
            quantity: undefined,
            unit: undefined,
            ingredient: undefined,
            preparation: undefined,
            nutritionalLink: undefined,
        },
        {
            code: "I",
            quantity: undefined,
            unit: undefined,
            ingredient: undefined,
            preparation: undefined,
            nutritionalLink: undefined,
        },
        {
            code: "T",
            quantity: undefined,
            unit: undefined,
            ingredient: "This is just some text.",
            preparation: undefined,
            nutritionalLink: undefined,
        },
        {
            code: "T",
            quantity: undefined,
            unit: undefined,
            ingredient: undefined,
            preparation: undefined,
            nutritionalLink: undefined,
        },
    ],
    directions: [
        {
            text: "This direction does not have a picture.",
            image: undefined,
        },
        {
            text: "This direction does have a picture.",
            image: undefined,
        },
    ],
    ratings: [
        {
            name: "Rating 1",
            value: 3,
        },
        {
            name: "Rating 2",
            value: 6,
        },
    ],
    nutrition:
        "Per Serving (excluding unknown items): 23 Calories; trace Fat (6.9% calories from fat); 1g Protein; 4g Carbohydrate; trace Dietary Fiber; 2mg Cholesterol; 43mg Sodium.  Exchanges: 1/2 Grain(Starch); 0 Fat.",
    embeddedRecipes: [recipe1],
};

const recipe3: Recipe = {
    ...recipe1,
    name: "Another recipe with only a name",
};

export const expected: Mx2 = {
    source: "MasterCook",
    date: "December 09, 2018",
    names: [
        "Recipe with only a name",
        "Recipe with everything filled out, including an embedded recipe",
        "Another recipe with only a name",
    ],
    recipes: [recipe1, recipe2, recipe3],
    warnings: [],
};

import { Mx2, Recipe } from "../model";

const recipe: Recipe = {
    name: "Recipe with everything filled out",
    description: "It's recipe comments.\n\nOn multiple lines.",
    servings: 6,
    yield: {
        quantity: 6,
        unit: "1/2 cups",
    },
    image: undefined,
    note:
        "Cooking Tip: Heading\nCooking Tip: Tippy\nCooking Tip: Line 1\n\nLine 2\nAuthor Note: Heading\nAuthor Note: Author note\nAuthor Note: Line 1\n\nLine 2",
    cuisine: undefined,
    categories: [
        "Barbecue",
        "Cakes",
        "Pastries",
        "and Desserts",
        "Potatoes",
        "Pasta",
        "and Grains",
        "Salad",
    ],
    servingIdeas: undefined,
    preparationTime: "1:11",
    totalTime: "4:44",
    alternateTime: {
        label: "Cooking Time",
        elapsed: "2:22",
    },
    author: "The Author",
    source: "The Source",
    copyright: undefined,
    alternateSource: {
        label: "Internet address",
        source: "The Webpage",
    },
    suggestedWine: undefined,
    ingredients: [
        {
            code: "S",
            quantity: undefined,
            unit: undefined,
            ingredient: "Heading",
            preparation: undefined,
            nutritionalLink: undefined,
        },
        {
            code: "I",
            quantity: "1 1/2",
            unit: "cups",
            ingredient: "egg yolks",
            preparation: undefined,
            nutritionalLink: undefined,
        },
        {
            code: "I",
            quantity: undefined,
            unit: "medium",
            ingredient: "apple",
            preparation: undefined,
            nutritionalLink: undefined,
        },
        {
            code: "I",
            quantity: "four",
            unit: undefined,
            ingredient: "peaches, pitted and chopped",
            preparation: undefined,
            nutritionalLink: undefined,
        },
        {
            code: "I",
            quantity: "1",
            unit: "cup",
            ingredient: "Another recipe with only a name",
            preparation: undefined,
            nutritionalLink: undefined,
        },
    ],
    directions: [
        {
            text: "Heading",
            image: undefined,
        },
        {
            text: "Procedure without image",
            image: undefined,
        },
        {
            text: "Procedure with image",
            image: undefined,
        },
        {
            text: "Line 1\n\nLine 2",
            image: undefined,
        },
    ],
    ratings: [],
    nutrition:
        "Per Serving (excluding unknown items): 236 Calories; 16g Fat (61.8% calories from fat); 11g Protein; 12g Carbohydrate; 2g Dietary Fiber; 659g Cholesterol; 29g Sodium.",
    embeddedRecipes: [],
};

export const expected: Mx2 = {
    source: "Living Cookbook 4.0",
    date: "2018-12-09",
    names: ["Recipe with everything filled out"],
    recipes: [recipe],
    warnings: [],
};

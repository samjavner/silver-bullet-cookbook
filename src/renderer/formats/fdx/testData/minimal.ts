import { Cookbook, Fdx, Recipe } from "../model";

const cookbook1: Cookbook = {
    id: 13,
    name: "Test Cookbook 1",
    comments: "Cookbook comments.\n\nOn multiple lines.",
    autoArchiveRules: [],
};

const recipe1: Recipe = {
    id: 1759,
    name: "Recipe with only a name",
    cookbookChapterId: undefined,
    createDate: "2018-12-09",
    cookbookId: 13,
    servings: undefined,
    yield: undefined,
    recipeTypes: [],
    preparationTime: undefined,
    cookingTime: undefined,
    inactiveTime: undefined,
    readyInTime: undefined,
    ovenTemperatureF: undefined,
    ovenTemperatureC: undefined,
    degreeOfDifficulty: undefined,
    comments: undefined,
    author: undefined,
    source: undefined,
    sourcePageNumber: undefined,
    webPage: undefined,
    copyright: undefined,
    userData1: undefined,
    userData2: undefined,
    userData3: undefined,
    userData4: undefined,
    userData5: undefined,
    userData6: undefined,
    userData7: undefined,
    userData8: undefined,
    userData9: undefined,
    userData10: undefined,
    userData11: undefined,
    userData12: undefined,
    userData13: undefined,
    userData14: undefined,
    userData15: undefined,
    colorFlag: "<None>",
    ingredients: [],
    procedures: [],
    nutrition: undefined,
    tips: [],
    reviews: [],
    authorNotes: [],
    measures: [],
    image: undefined,
    images: [],
    media: [],
    attachments: [],
    sourceImage: undefined,
};

export const expected: Fdx = {
    source: "Living Cookbook 4.0",
    fileVersion: "2.0",
    date: "2018-12-09",
    cookbooks: [cookbook1],
    cookbookChapters: [],
    recipes: [recipe1],
    ingredientFolders: [],
    ingredients: [],
    warnings: [],
};
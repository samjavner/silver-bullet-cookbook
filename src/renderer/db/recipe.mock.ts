import { Recipe } from "./recipe";

export const recipe1: Recipe = {
    id: "0033d412-ab27-479b-98ba-ca8c5b71a635",
    name: "Test Recipe",
    ingredients: "Ingredient 1\nIngredient 2",
    directions: "Direction 1\nDirection 2",
    servings: "2-4",
    yield: "4 dozen",
    categories: ["Category A", "B, C, D"],
    source: "Source A",
    author: "Author A",
    webPage: "http://example.com/test_recipe",
    sourcePageNumber: "50",
    copyright: "© 2014",
    publisher: "Publisher A",
    publishDate: "2014-01-06",
    sourceText: "Source 1\nSource 2",
    importWarnings: ["Warning A", "B, C, D"],
};

export const recipe2: Recipe = {
    ...recipe1,
    id: "22f22dae-a73b-4b61-8012-a653121f3998",
    name: "Test Recipe 2",
    ingredients: "Ingredient 2a\nIngredient 2b",
    directions: "Direction 2a\nDirection 2b",
};

export const recipe3: Recipe = {
    ...recipe1,
    id: "48e1a9ca-b128-41dd-83c3-d79d8133a209",
    name: "Test Recipe 3",
    ingredients: "Ingredient 3a\nIngredient 3b",
    directions: "Direction 3a\nDirection 3b",
};

export const recipe4: Recipe = {
    ...recipe1,
    id: "d4101c33-3ed0-471f-af6e-aff7ecd988cf",
    name: "Test Recipe 4",
    ingredients: "Ingredient 4a\nIngredient 4b",
    directions: "Direction 4a\nDirection 4b",
};

export const recipe5: Recipe = {
    ...recipe1,
    id: "1a739dae-668e-49f3-b739-c85b39259ab2",
    name: "Test Recipe 5",
    ingredients: "Ingredient 5a\nIngredient 5b",
    directions: "Direction 5a\nDirection 5b",
};

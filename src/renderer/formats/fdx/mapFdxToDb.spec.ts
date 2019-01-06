import { mapFdxToDb } from "./mapFdxToDb";
import * as model from "./model";

const recipe: model.Recipe = {
    id: 1759,
    name: "Example Recipe",
    cookbookChapterId: 161,
    createDate: "2018-12-09",
    cookbookId: 14,
    servings: 6,
    yield: "6 1/2 cups",
    recipeTypes: ["Recipe Type A", "Recipe Type B"],
    preparationTime: 71,
    cookingTime: 142,
    inactiveTime: 213,
    readyInTime: 284,
    ovenTemperatureF: 450,
    ovenTemperatureC: 232,
    degreeOfDifficulty: 5,
    comments: "Comments A\n\nComments B",
    author: "Author A",
    source: "Source A",
    sourcePageNumber: "156-157",
    webPage: "http://example.com/webpage",
    copyright: "© 1999",
    userData1: "Un",
    userData2: "Deux",
    userData3: "Trois",
    userData4: "Quatre",
    userData5: "Cinq",
    userData6: 6,
    userData7: 7,
    userData8: 8,
    userData9: 9,
    userData10: -10,
    userData11: "www.example.com/11",
    userData12: "www.example.com/12",
    userData13: "www.example.com/13",
    userData14: "www.example.com/14",
    userData15: "anything I want",
    colorFlag: "Purple",
    ingredients: [
        {
            quantity: "",
            unit: "",
            ingredient: "Heading A",
            heading: true,
            linkType: undefined,
            ingredientId: undefined,
            ingredientName: undefined,
            recipeId: undefined,
            recipeName: undefined,
            measureId: undefined,
            measure: undefined,
            measureQuantity: undefined,
            measureGramWeight: undefined,
        },
        {
            quantity: "",
            unit: "",
            ingredient: "",
            heading: true,
            linkType: undefined,
            ingredientId: undefined,
            ingredientName: undefined,
            recipeId: undefined,
            recipeName: undefined,
            measureId: undefined,
            measure: undefined,
            measureQuantity: undefined,
            measureGramWeight: undefined,
        },
        {
            quantity: "",
            unit: "",
            ingredient: "Ingredient A",
            heading: false,
            linkType: undefined,
            ingredientId: undefined,
            ingredientName: undefined,
            recipeId: undefined,
            recipeName: undefined,
            measureId: undefined,
            measure: undefined,
            measureQuantity: undefined,
            measureGramWeight: undefined,
        },
        {
            quantity: "1 1/2",
            unit: "",
            ingredient: "Ingredient B",
            heading: false,
            linkType: undefined,
            ingredientId: undefined,
            ingredientName: undefined,
            recipeId: undefined,
            recipeName: undefined,
            measureId: undefined,
            measure: undefined,
            measureQuantity: undefined,
            measureGramWeight: undefined,
        },
        {
            quantity: "",
            unit: "medium",
            ingredient: "Ingredient C",
            heading: false,
            linkType: undefined,
            ingredientId: undefined,
            ingredientName: undefined,
            recipeId: undefined,
            recipeName: undefined,
            measureId: undefined,
            measure: undefined,
            measureQuantity: undefined,
            measureGramWeight: undefined,
        },
        {
            quantity: "1 1/2",
            unit: "cups",
            ingredient: "Ingredient D",
            heading: false,
            linkType: undefined,
            ingredientId: undefined,
            ingredientName: undefined,
            recipeId: undefined,
            recipeName: undefined,
            measureId: undefined,
            measure: undefined,
            measureQuantity: undefined,
            measureGramWeight: undefined,
        },
        {
            quantity: "",
            unit: "",
            ingredient: "",
            heading: false,
            linkType: undefined,
            ingredientId: undefined,
            ingredientName: undefined,
            recipeId: undefined,
            recipeName: undefined,
            measureId: undefined,
            measure: undefined,
            measureQuantity: undefined,
            measureGramWeight: undefined,
        },
    ],
    procedures: [
        {
            heading: true,
            text: "Heading A",
            image: undefined,
        },
        {
            heading: true,
            text: "",
            image: undefined,
        },
        {
            heading: false,
            text: "Procedure A",
            image: undefined,
        },
        {
            heading: false,
            text: "Procedure B",
            image: undefined,
        },
        {
            heading: false,
            text: "Procedure C\n\nProcedure D",
            image: undefined,
        },
    ],
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

const fdx: model.Fdx = {
    source: "Living Cookbook 4.0",
    fileVersion: "2.0",
    date: "2018-12-09",
    cookbooks: [],
    cookbookChapters: [],
    recipes: [],
    ingredientFolders: [],
    ingredients: [],
    warnings: ["Warning A", "Warning B"],
};

const id = "85f1d9f0-4542-43a2-805d-cb9713ba0b65";

describe("mapFdxToDb", () => {
    describe("name", () => {
        it("should be mapped to name", () => {
            const actual = mapFdxToDb(recipe, fdx, id);
            expect(actual.name).toBe("Example Recipe");
        });

        it("should set name to 'Imported Recipe' when not present", () => {
            const actual = mapFdxToDb(
                {
                    ...recipe,
                    name: "",
                },
                fdx,
                id
            );
            expect(actual.name).toBe("Imported Recipe");
        });
    });

    describe("servings", () => {
        it("should be stringified and mapped to servings", () => {
            const actual = mapFdxToDb(recipe, fdx, id);
            expect(actual.servings).toBe("6");
        });

        it("should set servings to empty string when not present", () => {
            const actual = mapFdxToDb(
                {
                    ...recipe,
                    servings: undefined,
                },
                fdx,
                id
            );
            expect(actual.servings).toBe("");
        });

        it("should set servings to empty string when 0", () => {
            const actual = mapFdxToDb(
                {
                    ...recipe,
                    servings: 0,
                },
                fdx,
                id
            );
            expect(actual.servings).toBe("");
        });
    });

    describe("yield", () => {
        it("should be mapped to yield", () => {
            const actual = mapFdxToDb(recipe, fdx, id);
            expect(actual.yield).toBe("6 1/2 cups");
        });

        it("should set yield to empty string when not present", () => {
            const actual = mapFdxToDb(
                {
                    ...recipe,
                    yield: undefined,
                },
                fdx,
                id
            );
            expect(actual.yield).toBe("");
        });
    });

    describe("recipeTypes", () => {
        it("should be mapped to categories", () => {
            const actual = mapFdxToDb(recipe, fdx, id);
            expect(actual.categories).toEqual([
                "Recipe Type A",
                "Recipe Type B",
            ]);
        });
    });

    describe("ingredients", () => {
        it("should be mapped to ingredients", () => {
            const actual = mapFdxToDb(recipe, fdx, id).ingredients.split("\n");
            expect(actual.length).toBe(recipe.ingredients.length);
        });

        it("should map a heading to an ingredient with '# ' prepended to the text", () => {
            const actual = mapFdxToDb(recipe, fdx, id).ingredients.split("\n");
            expect(actual[0]).toBe("# Heading A");
        });

        it("should map a heading with no text to an empty string", () => {
            const actual = mapFdxToDb(recipe, fdx, id).ingredients.split("\n");
            expect(actual[1]).toBe("");
        });

        it("should map an ingredient with only text", () => {
            const actual = mapFdxToDb(recipe, fdx, id).ingredients.split("\n");
            expect(actual[2]).toBe("Ingredient A");
        });

        it("should map an ingredient with quantity and text", () => {
            const actual = mapFdxToDb(recipe, fdx, id).ingredients.split("\n");
            expect(actual[3]).toBe("1 1/2 Ingredient B");
        });

        it("should map an ingredient with unit and text", () => {
            const actual = mapFdxToDb(recipe, fdx, id).ingredients.split("\n");
            expect(actual[4]).toBe("medium Ingredient C");
        });

        it("should map an ingredient with quantity, unit, and text", () => {
            const actual = mapFdxToDb(recipe, fdx, id).ingredients.split("\n");
            expect(actual[5]).toBe("1 1/2 cups Ingredient D");
        });

        it("should map an ingredient with no text to an empty string", () => {
            const actual = mapFdxToDb(recipe, fdx, id).ingredients.split("\n");
            expect(actual[6]).toBe("");
        });
    });

    describe("procedures", () => {
        it("should map text to directions with non-empty headings formatted with '# ' prepended", () => {
            const actual = mapFdxToDb(recipe, fdx, id);
            expect(actual.directions).toEqual(
                "# Heading A\n\nProcedure A\nProcedure B\nProcedure C\n\nProcedure D"
            );
        });
    });

    describe("irrelevant db fields", () => {
        it("should have empty string for sourceText", () => {
            const actual = mapFdxToDb(recipe, fdx, id);
            expect(actual.sourceText).toBe("");
        });

        it("should have empty array for importWarnings", () => {
            const actual = mapFdxToDb(recipe, fdx, id);
            expect(actual.importWarnings).toEqual([]);
        });
    });
});

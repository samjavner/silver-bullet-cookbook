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
    preparationTime: 51,
    cookingTime: 142,
    inactiveTime: 213,
    readyInTime: 284,
    ovenTemperatureF: 450,
    ovenTemperatureC: 232,
    degreeOfDifficulty: 0,
    comments: "Comments A\n\nComments B",
    author: "Author A",
    source: "Source A",
    sourcePageNumber: "156-157",
    webPage: "http://example.com/recipe",
    copyright: "© 1999",
    userData1: "Un",
    userData2: "Deux",
    userData3: "Trois",
    userData4: "Quatre",
    userData5: "Cinq",
    userData6: 0,
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

    describe("webPage", () => {
        it("should be mapped to url", () => {
            const actual = mapFdxToDb(recipe, fdx, id);
            expect(actual.url).toBe("http://example.com/recipe");
        });

        it("should set url to empty string when not present", () => {
            const actual = mapFdxToDb(
                {
                    ...recipe,
                    webPage: undefined,
                },
                fdx,
                id
            );
            expect(actual.url).toBe("");
        });
    });

    describe("comments", () => {
        it("should be mapped to description", () => {
            const actual = mapFdxToDb(recipe, fdx, id);
            expect(actual.description).toBe("Comments A\n\nComments B");
        });

        it("should set description to empty string when not present", () => {
            const actual = mapFdxToDb(
                { ...recipe, comments: undefined },
                fdx,
                id
            );
            expect(actual.description).toBe("");
        });
    });

    describe("recipeTypes, difficulty, colorFlag, userData, source, author, sourcePageNumber", () => {
        it("should be mapped to tags", () => {
            const actual = mapFdxToDb(recipe, fdx, id);
            expect(actual.tags).toEqual([
                "Recipe Type A",
                "Recipe Type B",
                "difficulty: 0",
                "flag: Purple",
                "userdata1: Un",
                "userdata2: Deux",
                "userdata3: Trois",
                "userdata4: Quatre",
                "userdata5: Cinq",
                "userdata6: 0",
                "userdata7: 7",
                "userdata8: 8",
                "userdata9: 9",
                "userdata10: -10",
                "userdata11: www.example.com/11",
                "userdata12: www.example.com/12",
                "userdata13: www.example.com/13",
                "userdata14: www.example.com/14",
                "userdata15: anything I want",
                "source: Source A",
                "author: Author A",
                "page: 156-157",
                "copyright: © 1999",
            ]);
        });

        it("should not include fields that are not present", () => {
            const actual = mapFdxToDb(
                {
                    ...recipe,
                    degreeOfDifficulty: undefined,
                    colorFlag: "<None>",
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
                    source: undefined,
                    author: undefined,
                    sourcePageNumber: undefined,
                    copyright: undefined,
                },
                fdx,
                id
            );
            expect(actual.tags).toEqual(["Recipe Type A", "Recipe Type B"]);
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

    describe("preparationTime", () => {
        it("should be formatted and mapped to prepTime", () => {
            const actual = mapFdxToDb(recipe, fdx, id);
            expect(actual.prepTime).toBe("0:51");
        });

        it("should set prepTime to 0:00 when 0", () => {
            const actual = mapFdxToDb(
                { ...recipe, preparationTime: 0 },
                fdx,
                id
            );
            expect(actual.prepTime).toBe("0:00");
        });

        it("should set prepTime to empty string when not present", () => {
            const actual = mapFdxToDb(
                { ...recipe, preparationTime: undefined },
                fdx,
                id
            );
            expect(actual.prepTime).toBe("");
        });
    });

    describe("cookingTime", () => {
        it("should be formatted and mapped to cookTime", () => {
            const actual = mapFdxToDb(recipe, fdx, id);
            expect(actual.cookTime).toBe("2:22");
        });

        it("should set cookTime to 0:00 when 0", () => {
            const actual = mapFdxToDb({ ...recipe, cookingTime: 0 }, fdx, id);
            expect(actual.cookTime).toBe("0:00");
        });

        it("should set cookTime to empty string when not present", () => {
            const actual = mapFdxToDb(
                { ...recipe, cookingTime: undefined },
                fdx,
                id
            );
            expect(actual.cookTime).toBe("");
        });
    });

    describe("readyInTime", () => {
        it("should be formatted and mapped to totalTime", () => {
            const actual = mapFdxToDb(recipe, fdx, id);
            expect(actual.totalTime).toBe("4:44");
        });

        it("should set totalTime to 0:00 when 0", () => {
            const actual = mapFdxToDb({ ...recipe, readyInTime: 0 }, fdx, id);
            expect(actual.totalTime).toBe("0:00");
        });

        it("should set totalTime to empty string when not present", () => {
            const actual = mapFdxToDb(
                { ...recipe, readyInTime: undefined },
                fdx,
                id
            );
            expect(actual.totalTime).toBe("");
        });
    });

    describe("ovenTemperatureF, ovenTemperatureC", () => {
        it("should be ovenTemperatureF formatted and mapped to ovenTemperature", () => {
            const actual = mapFdxToDb(recipe, fdx, id);
            expect(actual.ovenTemperature).toBe("450°F");
        });

        it("should be ovenTemperatureC formatted and mapped to ovenTemperature when ovenTemperatureF not present", () => {
            const actual = mapFdxToDb(
                { ...recipe, ovenTemperatureF: undefined },
                fdx,
                id
            );
            expect(actual.ovenTemperature).toBe("232°C");
        });

        it("should be empty string when neither are present", () => {
            const actual = mapFdxToDb(
                {
                    ...recipe,
                    ovenTemperatureF: undefined,
                    ovenTemperatureC: undefined,
                },
                fdx,
                id
            );
            expect(actual.ovenTemperature).toBe("");
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

    describe("id", () => {
        it("should be mapped to id", () => {
            const actual = mapFdxToDb(recipe, fdx, id);
            expect(actual.id).toBe("85f1d9f0-4542-43a2-805d-cb9713ba0b65");
        });
    });

    it("should have default values for other fields", () => {
        const actual = mapFdxToDb(recipe, fdx, id);
        expect(actual.notes).toBe("");
        expect(actual.sourceText).toBe("");
        expect(actual.importWarnings).toEqual([]);
    });
});

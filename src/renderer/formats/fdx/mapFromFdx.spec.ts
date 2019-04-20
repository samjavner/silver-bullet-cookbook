import { mapFromFdx } from "./mapFromFdx";
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

describe("mapFromFdx", () => {
    describe("name", () => {
        it("should be name", () => {
            const actual = mapFromFdx(recipe, fdx);
            expect(actual.name).toBe("Example Recipe");
        });
    });

    describe("url", () => {
        it("should be webPage", () => {
            const actual = mapFromFdx(recipe, fdx);
            expect(actual.url).toBe("http://example.com/recipe");
        });

        it("should be empty string when webPage not present", () => {
            const actual = mapFromFdx({ ...recipe, webPage: undefined }, fdx);
            expect(actual.url).toBe("");
        });
    });

    describe("description", () => {
        it("should be comments", () => {
            const actual = mapFromFdx(recipe, fdx);
            expect(actual.description).toBe("Comments A\n\nComments B");
        });

        it("should be empty string when comments not present", () => {
            const actual = mapFromFdx({ ...recipe, comments: undefined }, fdx);
            expect(actual.description).toBe("");
        });
    });

    describe("ingredients", () => {
        it("should be mapped from ingredients", () => {
            const actual = mapFromFdx(recipe, fdx).ingredients.split("\n");
            expect(actual.length).toBe(recipe.ingredients.length);
        });

        it("should map a heading to an ingredient with '# ' prepended to the text", () => {
            const actual = mapFromFdx(recipe, fdx).ingredients.split("\n");
            expect(actual[0]).toBe("# Heading A");
        });

        it("should map a heading with no text to an empty string", () => {
            const actual = mapFromFdx(recipe, fdx).ingredients.split("\n");
            expect(actual[1]).toBe("");
        });

        it("should map an ingredient with only text", () => {
            const actual = mapFromFdx(recipe, fdx).ingredients.split("\n");
            expect(actual[2]).toBe("Ingredient A");
        });

        it("should map an ingredient with quantity and text", () => {
            const actual = mapFromFdx(recipe, fdx).ingredients.split("\n");
            expect(actual[3]).toBe("1 1/2 Ingredient B");
        });

        it("should map an ingredient with unit and text", () => {
            const actual = mapFromFdx(recipe, fdx).ingredients.split("\n");
            expect(actual[4]).toBe("medium Ingredient C");
        });

        it("should map an ingredient with quantity, unit, and text", () => {
            const actual = mapFromFdx(recipe, fdx).ingredients.split("\n");
            expect(actual[5]).toBe("1 1/2 cups Ingredient D");
        });

        it("should map an ingredient with no text to an empty string", () => {
            const actual = mapFromFdx(recipe, fdx).ingredients.split("\n");
            expect(actual[6]).toBe("");
        });
    });

    describe("directions", () => {
        it("should be mapped from procedures with non-empty headings formatted with '# ' prepended", () => {
            const actual = mapFromFdx(recipe, fdx);
            expect(actual.directions).toEqual(
                "# Heading A\n\nProcedure A\nProcedure B\nProcedure C\n\nProcedure D"
            );
        });
    });

    describe("importWarnings", () => {
        it("should be empty array", () => {
            const actual = mapFromFdx(recipe, fdx);
            expect(actual.importWarnings).toEqual([]);
        });
    });

    describe("extras", () => {
        it("should have recipeTypes", () => {
            const actual = mapFromFdx(recipe, fdx);
            expect(actual.extras.recipeTypes).toEqual([
                "Recipe Type A",
                "Recipe Type B",
            ]);
        });

        describe("degreeOfDifficulty", () => {
            it("should be stringified", () => {
                const actual = mapFromFdx(recipe, fdx);
                expect(actual.extras.degreeOfDifficulty).toBe("0");
            });

            it("should be undefined when not present", () => {
                const actual = mapFromFdx(
                    { ...recipe, degreeOfDifficulty: undefined },
                    fdx
                );
                expect(actual.extras.degreeOfDifficulty).toBeUndefined();
            });
        });

        describe("colorFlag", () => {
            it("should be set from colorFlag", () => {
                const actual = mapFromFdx(recipe, fdx);
                expect(actual.extras.colorFlag).toBe("Purple");
            });

            it("should be undefined when '<None>'", () => {
                const actual = mapFromFdx(
                    { ...recipe, colorFlag: "<None>" },
                    fdx
                );
                expect(actual.extras.colorFlag).toBeUndefined();
            });

            it("should be undefined when not present", () => {
                const actual = mapFromFdx(
                    { ...recipe, colorFlag: undefined },
                    fdx
                );
                expect(actual.extras.colorFlag).toBeUndefined();
            });
        });

        it("should have userData1", () => {
            const actual = mapFromFdx(recipe, fdx);
            expect(actual.extras.userData1).toBe("Un");
        });

        it("should have userData2", () => {
            const actual = mapFromFdx(recipe, fdx);
            expect(actual.extras.userData2).toBe("Deux");
        });

        it("should have userData3", () => {
            const actual = mapFromFdx(recipe, fdx);
            expect(actual.extras.userData3).toBe("Trois");
        });

        it("should have userData4", () => {
            const actual = mapFromFdx(recipe, fdx);
            expect(actual.extras.userData4).toBe("Quatre");
        });

        it("should have userData5", () => {
            const actual = mapFromFdx(recipe, fdx);
            expect(actual.extras.userData5).toBe("Cinq");
        });

        describe("userData6", () => {
            it("should be stringified", () => {
                const actual = mapFromFdx(recipe, fdx);
                expect(actual.extras.userData6).toBe("6");
            });

            it("should be '0' when 0", () => {
                const actual = mapFromFdx({ ...recipe, userData6: 0 }, fdx);
                expect(actual.extras.userData6).toBe("0");
            });

            it("should be undefined when not present", () => {
                const actual = mapFromFdx(
                    { ...recipe, userData6: undefined },
                    fdx
                );
                expect(actual.extras.userData6).toBeUndefined();
            });
        });

        describe("userData7", () => {
            it("should be stringified", () => {
                const actual = mapFromFdx(recipe, fdx);
                expect(actual.extras.userData7).toBe("7");
            });

            it("should be '0' when 0", () => {
                const actual = mapFromFdx({ ...recipe, userData7: 0 }, fdx);
                expect(actual.extras.userData7).toBe("0");
            });

            it("should be undefined when not present", () => {
                const actual = mapFromFdx(
                    { ...recipe, userData7: undefined },
                    fdx
                );
                expect(actual.extras.userData7).toBeUndefined();
            });
        });

        describe("userData8", () => {
            it("should be stringified", () => {
                const actual = mapFromFdx(recipe, fdx);
                expect(actual.extras.userData8).toBe("8");
            });

            it("should be '0' when 0", () => {
                const actual = mapFromFdx({ ...recipe, userData8: 0 }, fdx);
                expect(actual.extras.userData8).toBe("0");
            });

            it("should be undefined when not present", () => {
                const actual = mapFromFdx(
                    { ...recipe, userData8: undefined },
                    fdx
                );
                expect(actual.extras.userData8).toBeUndefined();
            });
        });

        describe("userData9", () => {
            it("should be stringified", () => {
                const actual = mapFromFdx(recipe, fdx);
                expect(actual.extras.userData9).toBe("9");
            });

            it("should be '0' when 0", () => {
                const actual = mapFromFdx({ ...recipe, userData9: 0 }, fdx);
                expect(actual.extras.userData9).toBe("0");
            });

            it("should be undefined when not present", () => {
                const actual = mapFromFdx(
                    { ...recipe, userData9: undefined },
                    fdx
                );
                expect(actual.extras.userData9).toBeUndefined();
            });
        });

        describe("userData10", () => {
            it("should be stringified", () => {
                const actual = mapFromFdx(recipe, fdx);
                expect(actual.extras.userData10).toBe("-10");
            });

            it("should be '0' when 0", () => {
                const actual = mapFromFdx({ ...recipe, userData10: 0 }, fdx);
                expect(actual.extras.userData10).toBe("0");
            });

            it("should be undefined when not present", () => {
                const actual = mapFromFdx(
                    { ...recipe, userData10: undefined },
                    fdx
                );
                expect(actual.extras.userData10).toBeUndefined();
            });
        });

        it("should have userData11", () => {
            const actual = mapFromFdx(recipe, fdx);
            expect(actual.extras.userData11).toBe("www.example.com/11");
        });

        it("should have userData12", () => {
            const actual = mapFromFdx(recipe, fdx);
            expect(actual.extras.userData12).toBe("www.example.com/12");
        });

        it("should have userData13", () => {
            const actual = mapFromFdx(recipe, fdx);
            expect(actual.extras.userData13).toBe("www.example.com/13");
        });

        it("should have userData14", () => {
            const actual = mapFromFdx(recipe, fdx);
            expect(actual.extras.userData14).toBe("www.example.com/14");
        });

        it("should have userData15", () => {
            const actual = mapFromFdx(recipe, fdx);
            expect(actual.extras.userData15).toBe("anything I want");
        });

        it("should have source", () => {
            const actual = mapFromFdx(recipe, fdx);
            expect(actual.extras.source).toBe("Source A");
        });

        it("should have author", () => {
            const actual = mapFromFdx(recipe, fdx);
            expect(actual.extras.author).toBe("Author A");
        });

        it("should have sourcePageNumber", () => {
            const actual = mapFromFdx(recipe, fdx);
            expect(actual.extras.sourcePageNumber).toBe("156-157");
        });

        it("should have copyright", () => {
            const actual = mapFromFdx(recipe, fdx);
            expect(actual.extras.copyright).toBe("© 1999");
        });

        describe("servings", () => {
            it("should be stringified", () => {
                const actual = mapFromFdx(recipe, fdx);
                expect(actual.extras.servings).toBe("6");
            });

            it("should be undefined when 0", () => {
                const actual = mapFromFdx({ ...recipe, servings: 0 }, fdx);
                expect(actual.extras.servings).toBeUndefined();
            });

            it("should be undefined when not present", () => {
                const actual = mapFromFdx(
                    { ...recipe, servings: undefined },
                    fdx
                );
                expect(actual.extras.servings).toBeUndefined();
            });
        });

        it("should have yield", () => {
            const actual = mapFromFdx(recipe, fdx);
            expect(actual.extras.yield).toBe("6 1/2 cups");
        });

        describe("preparationTime", () => {
            it("should be formatted", () => {
                const actual = mapFromFdx(recipe, fdx);
                expect(actual.extras.preparationTime).toBe("0:51");
            });

            it("should set be 0:00 when 0", () => {
                const actual = mapFromFdx(
                    { ...recipe, preparationTime: 0 },
                    fdx
                );
                expect(actual.extras.preparationTime).toBe("0:00");
            });

            it("should be undefined when not present", () => {
                const actual = mapFromFdx(
                    { ...recipe, preparationTime: undefined },
                    fdx
                );
                expect(actual.extras.preparationTime).toBeUndefined();
            });
        });

        describe("cookingTime", () => {
            it("should be formatted", () => {
                const actual = mapFromFdx(recipe, fdx);
                expect(actual.extras.cookingTime).toBe("2:22");
            });

            it("should set be 0:00 when 0", () => {
                const actual = mapFromFdx({ ...recipe, cookingTime: 0 }, fdx);
                expect(actual.extras.cookingTime).toBe("0:00");
            });

            it("should be undefined when not present", () => {
                const actual = mapFromFdx(
                    { ...recipe, cookingTime: undefined },
                    fdx
                );
                expect(actual.extras.cookingTime).toBeUndefined();
            });
        });

        describe("readyInTime", () => {
            it("should be formatted", () => {
                const actual = mapFromFdx(recipe, fdx);
                expect(actual.extras.readyInTime).toBe("4:44");
            });

            it("should set be 0:00 when 0", () => {
                const actual = mapFromFdx({ ...recipe, readyInTime: 0 }, fdx);
                expect(actual.extras.readyInTime).toBe("0:00");
            });

            it("should be undefined when not present", () => {
                const actual = mapFromFdx(
                    { ...recipe, readyInTime: undefined },
                    fdx
                );
                expect(actual.extras.readyInTime).toBeUndefined();
            });
        });

        describe("ovenTemperatureF", () => {
            it("should be formatted", () => {
                const actual = mapFromFdx(recipe, fdx);
                expect(actual.extras.ovenTemperatureF).toBe("450°F");
            });

            it("should be undefined when not present", () => {
                const actual = mapFromFdx(
                    { ...recipe, ovenTemperatureF: undefined },
                    fdx
                );
                expect(actual.extras.ovenTemperatureF).toBeUndefined();
            });
        });

        describe("ovenTemperatureC", () => {
            it("should be formatted", () => {
                const actual = mapFromFdx(recipe, fdx);
                expect(actual.extras.ovenTemperatureC).toBe("232°C");
            });

            it("should be undefined when not present", () => {
                const actual = mapFromFdx(
                    { ...recipe, ovenTemperatureC: undefined },
                    fdx
                );
                expect(actual.extras.ovenTemperatureC).toBeUndefined();
            });
        });
    });
});

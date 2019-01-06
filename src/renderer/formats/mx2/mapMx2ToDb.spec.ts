import { mapMx2ToDb } from "./mapMx2ToDb";
import * as model from "./model";

const recipe: model.Recipe = {
    name: "Example Recipe",
    description: "Description",
    servings: 42,
    yield: {
        quantity: 5.5,
        unit: "cups",
    },
    image: undefined,
    note: "Note 1\n\nNote 2",
    cuisine: "Cuisine A",
    categories: ["Category A", "Category B"],
    servingIdeas: "Serving Idea A\n\nServing Idea B",
    preparationTime: "2:50",
    totalTime: "4:44",
    alternateTime: {
        label: "Time Z",
        elapsed: "1:08",
    },
    author: "Author A",
    source: "Source A",
    copyright: "© 1999",
    alternateSource: {
        label: "Source Z",
        source: "Somewhere",
    },
    suggestedWine: "Wine A",
    ingredients: [
        {
            code: "S",
            quantity: undefined,
            unit: undefined,
            ingredient: "Subtitle A",
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
            code: "T",
            quantity: undefined,
            unit: undefined,
            ingredient: "Text A",
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
        {
            code: "I",
            quantity: undefined,
            unit: undefined,
            ingredient: "Ingredient A",
            preparation: undefined,
            nutritionalLink: undefined,
        },
        {
            code: "I",
            quantity: "1 1/2",
            unit: undefined,
            ingredient: "Ingredient B",
            preparation: undefined,
            nutritionalLink: undefined,
        },
        {
            code: "I",
            quantity: undefined,
            unit: "medium",
            ingredient: "Ingredient C",
            preparation: undefined,
            nutritionalLink: undefined,
        },
        {
            code: "I",
            quantity: "1 1/2",
            unit: "cups",
            ingredient: "Ingredient D",
            preparation: undefined,
            nutritionalLink: undefined,
        },
        {
            code: "I",
            quantity: "1 1/2",
            unit: "cups",
            ingredient: "Ingredient E",
            preparation: "chopped",
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
            code: "R",
            quantity: "1 1/2",
            unit: "cups",
            ingredient: "Recipe A",
            preparation: "chopped",
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
    ],
    directions: [
        {
            text: "Direction A",
            image: undefined,
        },
        {
            text: "Direction B",
            image: undefined,
        },
    ],
    ratings: [
        {
            name: "Rating A",
            value: 3,
        },
        {
            name: "Rating B",
            value: 6,
        },
    ],
    nutrition:
        "Per Serving (excluding unknown items): 23 Calories; trace Fat (6.9% calories from fat); 1g Protein; 4g Carbohydrate; trace Dietary Fiber; 2mg Cholesterol; 43mg Sodium.  Exchanges: 1/2 Grain(Starch); 0 Fat.",
    embeddedRecipes: [],
};

const mx2: model.Mx2 = {
    source: "MasterCook",
    date: "December 09, 2018",
    names: [],
    recipes: [],
    warnings: ["Warning A", "Warning B"],
};

const id = "85f1d9f0-4542-43a2-805d-cb9713ba0b65";

describe("mapMx2ToDb", () => {
    describe("name", () => {
        it("should be mapped to name", () => {
            const actual = mapMx2ToDb(recipe, mx2, id);
            expect(actual.name).toBe("Example Recipe");
        });

        it("should set name to 'Imported Recipe' when not present", () => {
            const actual = mapMx2ToDb(
                {
                    ...recipe,
                    name: "",
                },
                mx2,
                id
            );
            expect(actual.name).toBe("Imported Recipe");
        });
    });

    describe("servings", () => {
        it("should be stringified and mapped to servings", () => {
            const actual = mapMx2ToDb(recipe, mx2, id);
            expect(actual.servings).toBe("42");
        });

        it("should set servings to empty string when not present", () => {
            const actual = mapMx2ToDb(
                {
                    ...recipe,
                    servings: undefined,
                },
                mx2,
                id
            );
            expect(actual.servings).toBe("");
        });

        it("should set servings to empty string when 0", () => {
            const actual = mapMx2ToDb(
                {
                    ...recipe,
                    servings: 0,
                },
                mx2,
                id
            );
            expect(actual.servings).toBe("");
        });
    });

    describe("yield", () => {
        it("should be stringified and mapped to yield", () => {
            const actual = mapMx2ToDb(recipe, mx2, id);
            expect(actual.yield).toBe("5.5 cups");
        });

        it("should set yield to empty string when not present", () => {
            const actual = mapMx2ToDb(
                {
                    ...recipe,
                    yield: undefined,
                },
                mx2,
                id
            );
            expect(actual.yield).toBe("");
        });
    });

    describe("categories", () => {
        it("should be mapped to categories", () => {
            const actual = mapMx2ToDb(recipe, mx2, id);
            expect(actual.categories).toEqual(["Category A", "Category B"]);
        });
    });

    describe("ingredients", () => {
        it("should be mapped to ingredients", () => {
            const actual = mapMx2ToDb(recipe, mx2, id).ingredients.split("\n");
            expect(actual.length).toBe(recipe.ingredients.length);
        });

        it("should map a subtitle to an ingredient with '# ' prepended to the text", () => {
            const actual = mapMx2ToDb(recipe, mx2, id).ingredients.split("\n");
            expect(actual[0]).toBe("# Subtitle A");
        });

        it("should map a subtitle with no text to an empty string", () => {
            const actual = mapMx2ToDb(recipe, mx2, id).ingredients.split("\n");
            expect(actual[1]).toBe("");
        });

        it("should map a text entry to that text", () => {
            const actual = mapMx2ToDb(recipe, mx2, id).ingredients.split("\n");
            expect(actual[2]).toBe("Text A");
        });

        it("should map a text entry with no text to an empty string", () => {
            const actual = mapMx2ToDb(recipe, mx2, id).ingredients.split("\n");
            expect(actual[3]).toBe("");
        });

        it("should map an ingredient with only text", () => {
            const actual = mapMx2ToDb(recipe, mx2, id).ingredients.split("\n");
            expect(actual[4]).toBe("Ingredient A");
        });

        it("should map an ingredient with quantity and text", () => {
            const actual = mapMx2ToDb(recipe, mx2, id).ingredients.split("\n");
            expect(actual[5]).toBe("1 1/2 Ingredient B");
        });

        it("should map an ingredient with unit and text", () => {
            const actual = mapMx2ToDb(recipe, mx2, id).ingredients.split("\n");
            expect(actual[6]).toBe("medium Ingredient C");
        });

        it("should map an ingredient with quantity, unit, and text", () => {
            const actual = mapMx2ToDb(recipe, mx2, id).ingredients.split("\n");
            expect(actual[7]).toBe("1 1/2 cups Ingredient D");
        });

        it("should append semi-colon and preparationMethod", () => {
            const actual = mapMx2ToDb(recipe, mx2, id).ingredients.split("\n");
            expect(actual[8]).toBe("1 1/2 cups Ingredient E; chopped");
        });

        it("should map an ingredient with no text to an empty string", () => {
            const actual = mapMx2ToDb(recipe, mx2, id).ingredients.split("\n");
            expect(actual[9]).toBe("");
        });

        it("should map a recipe the same way as an ingredient", () => {
            const actual = mapMx2ToDb(recipe, mx2, id).ingredients.split("\n");
            expect(actual[10]).toBe("1 1/2 cups Recipe A; chopped");
        });

        it("should map a recipe with no text to an empty string", () => {
            const actual = mapMx2ToDb(recipe, mx2, id).ingredients.split("\n");
            expect(actual[11]).toBe("");
        });
    });

    describe("directions", () => {
        it("should map text to directions", () => {
            const actual = mapMx2ToDb(recipe, mx2, id);
            expect(actual.directions).toEqual("Direction A\nDirection B");
        });
    });

    describe("irrelevant db fields", () => {
        it("should have empty string for sourceText", () => {
            const actual = mapMx2ToDb(recipe, mx2, id);
            expect(actual.sourceText).toBe("");
        });

        it("should have empty array for importWarnings", () => {
            const actual = mapMx2ToDb(recipe, mx2, id);
            expect(actual.importWarnings).toEqual([]);
        });
    });
});

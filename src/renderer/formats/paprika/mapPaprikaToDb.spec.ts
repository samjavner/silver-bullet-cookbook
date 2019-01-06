import { mapPaprikaToDb } from "./mapPaprikaToDb";
import * as parser from "./parser";

const recipe: parser.Recipe = {
    name: "Example Recipe",
    created: "2018-05-08 07:39:41",
    prepTime: "20 mins",
    cookTime: "25 mins",
    servings: "4 servings",
    categories: ["Category A", "Category B"],
    difficulty: "Easy",
    rating: 4,
    source: "example.com",
    sourceUrl: "https://www.example.com/source_url",
    ingredients: "Ingredient A\nIngredient B",
    directions: "Direction A\n\nDirection B",
    notes: "Note A\n\nNote B",
    nutritionalInfo: "It's nutrition!\n\nMore nutrition.",
    scale: "1/1",
    imageUrl: "https://www.example.com/image_url.jpg",
    photoData: "xyz",
};

const id = "85f1d9f0-4542-43a2-805d-cb9713ba0b65";

describe("mapMxpToDb", () => {
    describe("name", () => {
        it("should be mapped to name", () => {
            const actual = mapPaprikaToDb(recipe, id);
            expect(actual.name).toBe("Example Recipe");
        });

        it("should set name to 'Imported Recipe' when not present", () => {
            const actual = mapPaprikaToDb(
                {
                    ...recipe,
                    name: undefined,
                },
                id
            );
            expect(actual.name).toBe("Imported Recipe");
        });
    });

    describe("id", () => {
        it("should be mapped to id", () => {
            const actual = mapPaprikaToDb(recipe, id);
            expect(actual.id).toBe("85f1d9f0-4542-43a2-805d-cb9713ba0b65");
        });
    });

    describe("servings", () => {
        it("should be mapped to servings", () => {
            const actual = mapPaprikaToDb(recipe, id);
            expect(actual.servings).toBe("4 servings");
        });

        it("should set servings to empty string when not present", () => {
            const actual = mapPaprikaToDb(
                {
                    ...recipe,
                    servings: undefined,
                },
                id
            );
            expect(actual.servings).toBe("");
        });
    });

    describe("categories", () => {
        it("should be mapped to categories", () => {
            const actual = mapPaprikaToDb(recipe, id);
            expect(actual.categories).toEqual(["Category A", "Category B"]);
        });
    });

    describe("ingredients", () => {
        it("should be mapped to ingredients", () => {
            const actual = mapPaprikaToDb(recipe, id);
            expect(actual.ingredients).toEqual("Ingredient A\nIngredient B");
        });
    });

    describe("directions", () => {
        it("should be mapped to directions", () => {
            const actual = mapPaprikaToDb(recipe, id);
            expect(actual.directions).toEqual("Direction A\n\nDirection B");
        });
    });

    describe("irrelevant db fields", () => {
        it("should have empty string for yield", () => {
            const actual = mapPaprikaToDb(recipe, id);
            expect(actual.yield).toBe("");
        });

        it("should have empty string for sourceText", () => {
            const actual = mapPaprikaToDb(recipe, id);
            expect(actual.sourceText).toBe("");
        });

        it("should have empty array for importWarnings", () => {
            const actual = mapPaprikaToDb(recipe, id);
            expect(actual.importWarnings).toEqual([]);
        });
    });
});

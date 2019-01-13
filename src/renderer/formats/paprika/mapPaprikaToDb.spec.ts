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
    source: "Source A",
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

describe("mapPaprikaToDb", () => {
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

    describe("sourceUrl", () => {
        it("should be mapped to url", () => {
            const actual = mapPaprikaToDb(recipe, id);
            expect(actual.url).toBe("https://www.example.com/source_url");
        });

        it("should set url to empty string when not present", () => {
            const actual = mapPaprikaToDb(
                {
                    ...recipe,
                    sourceUrl: undefined,
                },
                id
            );
            expect(actual.url).toBe("");
        });
    });

    describe("categories, difficulty, source", () => {
        it("should be mapped to tags", () => {
            const actual = mapPaprikaToDb(recipe, id);
            expect(actual.tags).toEqual([
                "Category A",
                "Category B",
                "difficulty: Easy",
                "source: Source A",
            ]);
        });

        it("should not include fields that are not present", () => {
            const actual = mapPaprikaToDb(
                {
                    ...recipe,
                    difficulty: undefined,
                    source: undefined,
                },
                id
            );
            expect(actual.tags).toEqual(["Category A", "Category B"]);
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

    describe("prepTime", () => {
        it("should be mapped to prepTime", () => {
            const actual = mapPaprikaToDb(recipe, id);
            expect(actual.prepTime).toBe("20 mins");
        });

        it("should set prepTime to empty string when not present", () => {
            const actual = mapPaprikaToDb(
                { ...recipe, prepTime: undefined },
                id
            );
            expect(actual.prepTime).toBe("");
        });
    });

    describe("cookTime", () => {
        it("should be mapped to cookTime", () => {
            const actual = mapPaprikaToDb(recipe, id);
            expect(actual.cookTime).toBe("25 mins");
        });

        it("should set cookTime to empty string when not present", () => {
            const actual = mapPaprikaToDb(
                { ...recipe, cookTime: undefined },
                id
            );
            expect(actual.cookTime).toBe("");
        });
    });

    describe("notes", () => {
        it("should be mapped to notes", () => {
            const actual = mapPaprikaToDb(recipe, id);
            expect(actual.notes).toBe("Note A\n\nNote B");
        });

        it("should set notes to empty string when not present", () => {
            const actual = mapPaprikaToDb({ ...recipe, notes: undefined }, id);
            expect(actual.notes).toBe("");
        });
    });

    describe("ingredients", () => {
        it("should be mapped to ingredients", () => {
            const actual = mapPaprikaToDb(recipe, id);
            expect(actual.ingredients).toEqual("Ingredient A\nIngredient B");
        });

        it("should set ingredients to empty string when not present", () => {
            const actual = mapPaprikaToDb(
                {
                    ...recipe,
                    ingredients: undefined,
                },
                id
            );
            expect(actual.ingredients).toBe("");
        });
    });

    describe("directions", () => {
        it("should be mapped to directions", () => {
            const actual = mapPaprikaToDb(recipe, id);
            expect(actual.directions).toEqual("Direction A\n\nDirection B");
        });

        it("should set directions to empty string when not present", () => {
            const actual = mapPaprikaToDb(
                {
                    ...recipe,
                    directions: undefined,
                },
                id
            );
            expect(actual.directions).toBe("");
        });
    });

    describe("id", () => {
        it("should be mapped to id", () => {
            const actual = mapPaprikaToDb(recipe, id);
            expect(actual.id).toBe("85f1d9f0-4542-43a2-805d-cb9713ba0b65");
        });
    });

    it("should have default values for other fields", () => {
        const actual = mapPaprikaToDb(recipe, id);
        expect(actual.description).toBe("");
        expect(actual.yield).toBe("");
        expect(actual.totalTime).toBe("");
        expect(actual.ovenTemperature).toBe("");
        expect(actual.sourceText).toBe("");
        expect(actual.importWarnings).toEqual([]);
    });
});

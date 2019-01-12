import { mapMxpToDb } from "./mapMxpToDb";
import * as parser from "./parser";

const recipe: parser.Recipe = {
    title: "Example Recipe",
    recipeBy: "James and Carol",
    servingSize: "4",
    preparationTime: "1:15",
    categories: ["Category A", "Category B"],
    ingredients: [
        {
            amount: "",
            measure: "",
            text: "Ingredient A",
            preparationMethod: "",
        },
        {
            amount: "1 1/2",
            measure: "",
            text: "Ingredient B",
            preparationMethod: "",
        },
        {
            amount: "",
            measure: "medium",
            text: "Ingredient C",
            preparationMethod: "",
        },
        {
            amount: "1 1/2",
            measure: "cups",
            text: "Ingredient D",
            preparationMethod: "",
        },
        {
            amount: "1 1/2",
            measure: "cups",
            text: "Ingredient E",
            preparationMethod: "chopped",
        },
    ],
    directions: ["Direction A", "Direction B"],
    notes: ["Note A", "Note B"],
};

const source: string[] = ["Line 1", "Line 2"];

const id = "85f1d9f0-4542-43a2-805d-cb9713ba0b65";

describe("mapMxpToDb", () => {
    describe("title", () => {
        it("should be mapped to name", () => {
            const actual = mapMxpToDb(recipe, source, id);
            expect(actual.name).toBe("Example Recipe");
        });

        it("should set name to 'Imported Recipe' when not present", () => {
            const actual = mapMxpToDb(
                {
                    ...recipe,
                    title: undefined,
                },
                source,
                id
            );
            expect(actual.name).toBe("Imported Recipe");
        });
    });

    describe("categories, recipeBy", () => {
        it("should be mapped to tags", () => {
            const actual = mapMxpToDb(recipe, source, id);
            expect(actual.tags).toEqual([
                "Category A",
                "Category B",
                "by: James and Carol",
            ]);
        });

        it("should not include fields that are not present", () => {
            const actual = mapMxpToDb(
                {
                    ...recipe,
                    recipeBy: undefined,
                },
                source,
                id
            );
            expect(actual.tags).toEqual(["Category A", "Category B"]);
        });
    });

    describe("servingSize", () => {
        it("should be mapped to servings", () => {
            const actual = mapMxpToDb(recipe, source, id);
            expect(actual.servings).toBe("4");
        });

        it("should set servings to empty string when not present", () => {
            const actual = mapMxpToDb(
                {
                    ...recipe,
                    servingSize: undefined,
                },
                source,
                id
            );
            expect(actual.servings).toBe("");
        });
    });

    describe("preparationTime", () => {
        it("should be mapped to prepTime", () => {
            const actual = mapMxpToDb(recipe, source, id);
            expect(actual.prepTime).toBe("1:15");
        });

        it("should set prepTime to empty string when not present", () => {
            const actual = mapMxpToDb(
                { ...recipe, preparationTime: undefined },
                source,
                id
            );
            expect(actual.prepTime).toBe("");
        });
    });

    describe("notes", () => {
        it("should join together notes with newlines into notes", () => {
            const actual = mapMxpToDb(recipe, source, id);
            expect(actual.notes).toBe("Note A\nNote B");
        });
    });

    describe("ingredients", () => {
        it("should be mapped to ingredients", () => {
            const actual = mapMxpToDb(recipe, source, id).ingredients.split(
                "\n"
            );
            expect(actual.length).toBe(5);
        });

        it("should map an ingredient with only text", () => {
            const actual = mapMxpToDb(recipe, source, id).ingredients.split(
                "\n"
            );
            expect(actual[0]).toBe("Ingredient A");
        });

        it("should map an ingredient with quantity and text", () => {
            const actual = mapMxpToDb(recipe, source, id).ingredients.split(
                "\n"
            );
            expect(actual[1]).toBe("1 1/2 Ingredient B");
        });

        it("should map an ingredient with unit and text", () => {
            const actual = mapMxpToDb(recipe, source, id).ingredients.split(
                "\n"
            );
            expect(actual[2]).toBe("medium Ingredient C");
        });

        it("should map an ingredient with quantity, unit, and text", () => {
            const actual = mapMxpToDb(recipe, source, id).ingredients.split(
                "\n"
            );
            expect(actual[3]).toBe("1 1/2 cups Ingredient D");
        });

        it("should append semi-colon and preparationMethod", () => {
            const actual = mapMxpToDb(recipe, source, id).ingredients.split(
                "\n"
            );
            expect(actual[4]).toBe("1 1/2 cups Ingredient E; chopped");
        });
    });

    describe("directions", () => {
        it("should join together directions with newlines into directions", () => {
            const actual = mapMxpToDb(recipe, source, id);
            expect(actual.directions).toBe("Direction A\nDirection B");
        });
    });

    describe("source", () => {
        it("should join together source with newlines into sourceText", () => {
            const actual = mapMxpToDb(recipe, source, id);
            expect(actual.sourceText).toBe("Line 1\nLine 2");
        });
    });

    describe("id", () => {
        it("should be mapped to id", () => {
            const actual = mapMxpToDb(recipe, source, id);
            expect(actual.id).toBe("85f1d9f0-4542-43a2-805d-cb9713ba0b65");
        });
    });

    it("should have default values for other fields", () => {
        const actual = mapMxpToDb(recipe, source, id);
        expect(actual.url).toBe("");
        expect(actual.description).toBe("");
        expect(actual.yield).toBe("");
        expect(actual.cookTime).toBe("");
        expect(actual.totalTime).toBe("");
        expect(actual.ovenTemperature).toBe("");
        expect(actual.importWarnings).toEqual([]);
    });
});

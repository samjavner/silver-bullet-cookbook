import { mapMmfToDb } from "./mapMmfToDb";
import * as parser from "./parser";

const recipe: parser.Recipe = {
    title: "Example Recipe",
    yield: "4 servings",
    servings: undefined,
    categories: ["Category A", "Category B"],
    ingredients: [
        {
            type: "ingredient_heading",
            text: "Heading",
        },
        {
            type: "ingredient",
            quantity: "",
            unit: "",
            text: "Ingredient A",
        },
        {
            type: "ingredient",
            quantity: "1 1/2",
            unit: "",
            text: "Ingredient B",
        },
        {
            type: "ingredient",
            quantity: "",
            unit: "md",
            text: "Ingredient C",
        },
        {
            type: "ingredient",
            quantity: "1 1/2",
            unit: "md",
            text: "Ingredient D",
        },
    ],
    directions: ["Direction A", "Direction B"],
    warnings: ["Warning A", "Warning B"],
};

const source: string[] = ["Line 1", "Line 2"];

const id = "85f1d9f0-4542-43a2-805d-cb9713ba0b65";

describe("mapMmfToDb", () => {
    describe("title", () => {
        it("should be mapped to name", () => {
            const actual = mapMmfToDb(recipe, source, id);
            expect(actual.name).toBe("Example Recipe");
        });

        it("should set name to 'Imported Recipe' when not present", () => {
            const actual = mapMmfToDb(
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

    describe("yield", () => {
        it("should be mapped to yield", () => {
            const actual = mapMmfToDb(recipe, source, id);
            expect(actual.yield).toBe("4 servings");
        });

        it("should set yield to empty string when not present", () => {
            const actual = mapMmfToDb(
                {
                    ...recipe,
                    yield: undefined,
                },
                source,
                id
            );
            expect(actual.yield).toBe("");
        });
    });

    describe("servings", () => {
        it("should be mapped to servings", () => {
            const actual = mapMmfToDb(
                {
                    ...recipe,
                    yield: undefined,
                    servings: "4",
                },
                source,
                id
            );
            expect(actual.servings).toBe("4");
        });

        it("should set servings to empty string when not present", () => {
            const actual = mapMmfToDb(recipe, source, id);
            expect(actual.servings).toBe("");
        });
    });

    describe("categories", () => {
        it("should be mapped to categories", () => {
            const actual = mapMmfToDb(recipe, source, id);
            expect(actual.categories).toEqual(["Category A", "Category B"]);
        });
    });

    describe("ingredients", () => {
        it("should be mapped to ingredients", () => {
            const actual = mapMmfToDb(recipe, source, id).ingredients.split(
                "\n"
            );
            expect(actual.length).toBe(5);
        });

        it("should map a heading to an ingredient with '# ' prepended to the text", () => {
            const actual = mapMmfToDb(recipe, source, id).ingredients.split(
                "\n"
            );
            expect(actual[0]).toBe("# Heading");
        });

        it("should map an ingredient with only text", () => {
            const actual = mapMmfToDb(recipe, source, id).ingredients.split(
                "\n"
            );
            expect(actual[1]).toBe("Ingredient A");
        });

        it("should map an ingredient with quantity and text", () => {
            const actual = mapMmfToDb(recipe, source, id).ingredients.split(
                "\n"
            );
            expect(actual[2]).toBe("1 1/2 Ingredient B");
        });

        it("should map an ingredient with unit and text", () => {
            const actual = mapMmfToDb(recipe, source, id).ingredients.split(
                "\n"
            );
            expect(actual[3]).toBe("md Ingredient C");
        });

        it("should map an ingredient with quantity, unit, and text", () => {
            const actual = mapMmfToDb(recipe, source, id).ingredients.split(
                "\n"
            );
            expect(actual[4]).toBe("1 1/2 md Ingredient D");
        });
    });

    describe("directions", () => {
        it("should join together directions with newlines into directions", () => {
            const actual = mapMmfToDb(recipe, source, id);
            expect(actual.directions).toBe("Direction A\nDirection B");
        });
    });

    describe("warnings", () => {
        it("should be mapped to importWarnings", () => {
            const actual = mapMmfToDb(recipe, source, id);
            expect(actual.importWarnings).toEqual(["Warning A", "Warning B"]);
        });
    });

    describe("source", () => {
        it("should join together source with newlines into sourceText", () => {
            const actual = mapMmfToDb(recipe, source, id);
            expect(actual.sourceText).toBe("Line 1\nLine 2");
        });
    });
});

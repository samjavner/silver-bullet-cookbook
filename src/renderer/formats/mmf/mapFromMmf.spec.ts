import { mapFromMmf } from "./mapFromMmf";
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

describe("mapFromMmf", () => {
    describe("name", () => {
        it("should be title", () => {
            const actual = mapFromMmf(recipe);
            expect(actual.name).toBe("Example Recipe");
        });

        it("should be empty string when title not present", () => {
            const actual = mapFromMmf({ ...recipe, title: undefined });
            expect(actual.name).toBe("");
        });
    });

    describe("url", () => {
        it("should be empty string", () => {
            const actual = mapFromMmf(recipe);
            expect(actual.url).toBe("");
        });
    });

    describe("description", () => {
        it("should be empty string", () => {
            const actual = mapFromMmf(recipe);
            expect(actual.description).toBe("");
        });
    });

    describe("ingredients", () => {
        it("should be mapped from ingredients", () => {
            const actual = mapFromMmf(recipe).ingredients.split("\n");
            expect(actual.length).toBe(5);
        });

        it("should map a heading to an ingredient with '# ' prepended to the text", () => {
            const actual = mapFromMmf(recipe).ingredients.split("\n");
            expect(actual[0]).toBe("# Heading");
        });

        it("should map an ingredient with only text", () => {
            const actual = mapFromMmf(recipe).ingredients.split("\n");
            expect(actual[1]).toBe("Ingredient A");
        });

        it("should map an ingredient with quantity and text", () => {
            const actual = mapFromMmf(recipe).ingredients.split("\n");
            expect(actual[2]).toBe("1 1/2 Ingredient B");
        });

        it("should map an ingredient with unit and text", () => {
            const actual = mapFromMmf(recipe).ingredients.split("\n");
            expect(actual[3]).toBe("md Ingredient C");
        });

        it("should map an ingredient with quantity, unit, and text", () => {
            const actual = mapFromMmf(recipe).ingredients.split("\n");
            expect(actual[4]).toBe("1 1/2 md Ingredient D");
        });
    });

    describe("directions", () => {
        it("should join together directions with newlines", () => {
            const actual = mapFromMmf(recipe);
            expect(actual.directions).toBe("Direction A\nDirection B");
        });
    });

    describe("importWarnings", () => {
        it("should be warnings", () => {
            const actual = mapFromMmf(recipe);
            expect(actual.importWarnings).toEqual(["Warning A", "Warning B"]);
        });
    });

    describe("extras", () => {
        it("should have categories", () => {
            const actual = mapFromMmf(recipe);
            expect(actual.extras.categories).toEqual([
                "Category A",
                "Category B",
            ]);
        });

        it("should have servings", () => {
            const actual = mapFromMmf({
                ...recipe,
                servings: "4",
                yield: undefined,
            });
            expect(actual.extras.servings).toEqual("4");
        });

        it("should have yield", () => {
            const actual = mapFromMmf(recipe);
            expect(actual.extras.yield).toBe("4 servings");
        });
    });
});

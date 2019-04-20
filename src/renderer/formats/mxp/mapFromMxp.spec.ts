import { mapFromMxp } from "./mapFromMxp";
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

describe("mapFromMxp", () => {
    describe("name", () => {
        it("should be title", () => {
            const actual = mapFromMxp(recipe);
            expect(actual.name).toBe("Example Recipe");
        });

        it("should be empty string when title not present", () => {
            const actual = mapFromMxp({ ...recipe, title: undefined });
            expect(actual.name).toBe("");
        });
    });

    describe("url", () => {
        it("should be empty string", () => {
            const actual = mapFromMxp(recipe);
            expect(actual.url).toBe("");
        });
    });

    describe("description", () => {
        it("should be empty string", () => {
            const actual = mapFromMxp(recipe);
            expect(actual.description).toBe("");
        });
    });

    describe("ingredients", () => {
        it("should be mapped to ingredients", () => {
            const actual = mapFromMxp(recipe).ingredients.split("\n");
            expect(actual.length).toBe(5);
        });

        it("should map an ingredient with only text", () => {
            const actual = mapFromMxp(recipe).ingredients.split("\n");
            expect(actual[0]).toBe("Ingredient A");
        });

        it("should map an ingredient with quantity and text", () => {
            const actual = mapFromMxp(recipe).ingredients.split("\n");
            expect(actual[1]).toBe("1 1/2 Ingredient B");
        });

        it("should map an ingredient with unit and text", () => {
            const actual = mapFromMxp(recipe).ingredients.split("\n");
            expect(actual[2]).toBe("medium Ingredient C");
        });

        it("should map an ingredient with quantity, unit, and text", () => {
            const actual = mapFromMxp(recipe).ingredients.split("\n");
            expect(actual[3]).toBe("1 1/2 cups Ingredient D");
        });

        it("should append semi-colon and preparationMethod", () => {
            const actual = mapFromMxp(recipe).ingredients.split("\n");
            expect(actual[4]).toBe("1 1/2 cups Ingredient E; chopped");
        });
    });

    describe("directions", () => {
        it("should join together directions with newlines into directions", () => {
            const actual = mapFromMxp(recipe);
            expect(actual.directions).toBe("Direction A\nDirection B");
        });
    });

    describe("importWarnings", () => {
        it("should be empty array", () => {
            const actual = mapFromMxp(recipe);
            expect(actual.importWarnings).toEqual([]);
        });
    });

    describe("extras", () => {
        it("should have categories", () => {
            const actual = mapFromMxp(recipe);
            expect(actual.extras.categories).toEqual([
                "Category A",
                "Category B",
            ]);
        });

        it("should have recipeBy", () => {
            const actual = mapFromMxp(recipe);
            expect(actual.extras.recipeBy).toBe("James and Carol");
        });

        it("should have servingSize", () => {
            const actual = mapFromMxp(recipe);
            expect(actual.extras.servingSize).toBe("4");
        });

        it("should have preparationTime", () => {
            const actual = mapFromMxp(recipe);
            expect(actual.extras.preparationTime).toBe("1:15");
        });

        it("should have notes", () => {
            const actual = mapFromMxp(recipe);
            expect(actual.extras.notes).toEqual(["Note A", "Note B"]);
        });
    });
});

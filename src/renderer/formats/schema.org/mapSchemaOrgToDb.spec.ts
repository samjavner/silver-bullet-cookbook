import { mapSchemaOrgToDb } from "./mapSchemaOrgToDb";
import * as model from "./model";

const recipe: model.Recipe = {
    aggregateRating: undefined,
    authors: [],
    cookingMethods: [],
    cookTime: undefined,
    dateModified: undefined,
    datePublished: undefined,
    description: undefined,
    headline: undefined,
    images: [],
    keywords: undefined,
    mainEntityOfPage: true,
    name: "Example Recipe",
    prepTime: undefined,
    publisher: undefined,
    recipeCategories: ["Category A", "Category B"],
    recipeIngredients: ["Ingredient A", "Ingredient B"],
    recipeInstructions: ["Instruction A", "Instruction B"],
    recipeYield: "12 large pretzels",
    reviews: [],
    totalTime: undefined,
    url: undefined,
    warnings: ["Warning A", "Warning B"],
};

const id = "85f1d9f0-4542-43a2-805d-cb9713ba0b65";

describe("mapSchemaOrgToDb", () => {
    describe("name", () => {
        it("should be mapped to name", () => {
            const actual = mapSchemaOrgToDb(recipe, id);
            expect(actual.name).toBe("Example Recipe");
        });

        it("should set name to 'Imported Recipe' when not present", () => {
            const actual = mapSchemaOrgToDb(
                {
                    ...recipe,
                    name: undefined,
                },
                id
            );
            expect(actual.name).toBe("Imported Recipe");
        });
    });

    describe("recipeYield", () => {
        it("should be mapped to yield", () => {
            const actual = mapSchemaOrgToDb(recipe, id);
            expect(actual.yield).toBe("12 large pretzels");
        });

        it("should set yield to empty string when not present", () => {
            const actual = mapSchemaOrgToDb(
                {
                    ...recipe,
                    recipeYield: undefined,
                },
                id
            );
            expect(actual.yield).toBe("");
        });
    });

    describe("recipeCategories", () => {
        it("should be mapped to categories", () => {
            const actual = mapSchemaOrgToDb(recipe, id);
            expect(actual.categories).toEqual(["Category A", "Category B"]);
        });
    });

    describe("recipeIngredients", () => {
        it("should be mapped to ingredients", () => {
            const actual = mapSchemaOrgToDb(recipe, id);
            expect(actual.ingredients).toBe("Ingredient A\nIngredient B");
        });
    });

    describe("recipeInstructions", () => {
        it("should be mapped to directions", () => {
            const actual = mapSchemaOrgToDb(recipe, id);
            expect(actual.directions).toBe("Instruction A\nInstruction B");
        });
    });

    describe("warnings", () => {
        it("should be mapped to importWarnings", () => {
            const actual = mapSchemaOrgToDb(recipe, id);
            expect(actual.importWarnings).toEqual(["Warning A", "Warning B"]);
        });
    });

    describe("id", () => {
        it("should be mapped to id", () => {
            const actual = mapSchemaOrgToDb(recipe, id);
            expect(actual.id).toBe("85f1d9f0-4542-43a2-805d-cb9713ba0b65");
        });
    });

    describe("irrelevant db fields", () => {
        it("should have empty string for servings", () => {
            const actual = mapSchemaOrgToDb(recipe, id);
            expect(actual.servings).toBe("");
        });

        it("should have empty string for sourceText", () => {
            const actual = mapSchemaOrgToDb(recipe, id);
            expect(actual.sourceText).toBe("");
        });
    });
});

import { mapSchemaOrgToDb } from "./mapSchemaOrgToDb";
import * as model from "./model";

const recipe: model.Recipe = {
    aggregateRating: undefined,
    authors: [
        {
            name: "Author A",
            url: "http://www.example.com/profiles/talent/author_a",
        },
        {
            name: "Author B",
            url: "http://www.example.com/profiles/talent/author_b",
        },
        {
            name: "Author C",
            url: "http://www.example.com/profiles/talent/author_c",
        },
    ],
    cookingMethods: [],
    cookTime: undefined,
    dateModified: undefined,
    datePublished: "2015-06-07T10:34:32.152-04:00",
    description: undefined,
    headline: undefined,
    images: [],
    keywords: undefined,
    mainEntityOfPage: true,
    name: "Example Recipe",
    prepTime: undefined,
    publisher: {
        logo: {
            height: 60,
            url: "https://www.example.com/sites/all/themes/emma/img/logo.png",
            width: 118,
        },
        name: "Publisher A",
        url: "https://www.example.com/publisher_a",
    },
    recipeCategories: ["Category A", "Category B"],
    recipeIngredients: ["Ingredient A", "Ingredient B"],
    recipeInstructions: ["Instruction A", "Instruction B"],
    recipeYield: "12 large pretzels",
    reviews: [],
    totalTime: undefined,
    url: "https://www.example.com/recipe",
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

    describe("author.name", () => {
        it("should be joined togther with '; ' and mapped to author", () => {
            const actual = mapSchemaOrgToDb(recipe, id);
            expect(actual.author).toBe("Author A; Author B; Author C");
        });

        it("should set author to empty string when no authors", () => {
            const actual = mapSchemaOrgToDb(
                {
                    ...recipe,
                    authors: [],
                },
                id
            );
            expect(actual.author).toBe("");
        });

        it("should not include authors without names in author", () => {
            const actual = mapSchemaOrgToDb(
                {
                    ...recipe,
                    authors: [
                        recipe.authors[0],
                        {
                            ...recipe.authors[1],
                            name: undefined,
                        },
                        recipe.authors[2],
                    ],
                },
                id
            );
            expect(actual.author).toBe("Author A; Author C");
        });
    });

    describe("url", () => {
        it("should be mapped to webPage", () => {
            const actual = mapSchemaOrgToDb(recipe, id);
            expect(actual.webPage).toBe("https://www.example.com/recipe");
        });

        it("should set webPage to empty string when not present", () => {
            const actual = mapSchemaOrgToDb(
                {
                    ...recipe,
                    url: undefined,
                },
                id
            );
            expect(actual.webPage).toBe("");
        });
    });

    describe("publisher.name", () => {
        it("should be mapped to publisher", () => {
            const actual = mapSchemaOrgToDb(recipe, id);
            expect(actual.publisher).toBe("Publisher A");
        });

        it("should set publisher to empty string when publisher not present", () => {
            const actual = mapSchemaOrgToDb(
                {
                    ...recipe,
                    publisher: undefined,
                },
                id
            );
            expect(actual.publisher).toBe("");
        });

        it("should set publisher to empty string when publisher name not present", () => {
            const actual = mapSchemaOrgToDb(
                {
                    ...recipe,
                    publisher: {
                        ...(recipe.publisher as model.Organization),
                        name: undefined,
                    },
                },
                id
            );
            expect(actual.publisher).toBe("");
        });
    });

    describe("datePublished", () => {
        it("should be mapped to publishDate", () => {
            const actual = mapSchemaOrgToDb(recipe, id);
            expect(actual.publishDate).toBe("2015-06-07T10:34:32.152-04:00");
        });

        it("should set publishDate to empty string when not present", () => {
            const actual = mapSchemaOrgToDb(
                {
                    ...recipe,
                    datePublished: undefined,
                },
                id
            );
            expect(actual.publishDate).toBe("");
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

    it("should have default values for other fields", () => {
        const actual = mapSchemaOrgToDb(recipe, id);
        expect(actual.servings).toBe("");
        expect(actual.source).toBe("");
        expect(actual.sourcePageNumber).toBe("");
        expect(actual.copyright).toBe("");
        expect(actual.sourceText).toBe("");
    });
});

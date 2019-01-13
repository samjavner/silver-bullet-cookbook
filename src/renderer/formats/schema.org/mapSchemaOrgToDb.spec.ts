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
    cookTime: "P0Y0M0DT0H20M0.000S",
    dateModified: undefined,
    datePublished: "2015-06-07T10:34:32.152-04:00",
    description: "It's a description!",
    headline: "It's a headline!",
    images: [],
    keywords: "Category A, Category C, Category B, Category D",
    mainEntityOfPage: true,
    name: "Example Recipe",
    prepTime: "P0Y0M0DT2H40M0.000S",
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
    totalTime: "P0DT0H35M",
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

    describe("url", () => {
        it("should be mapped to url", () => {
            const actual = mapSchemaOrgToDb(recipe, id);
            expect(actual.url).toBe("https://www.example.com/recipe");
        });

        it("should set webPage to empty string when not present", () => {
            const actual = mapSchemaOrgToDb(
                {
                    ...recipe,
                    url: undefined,
                },
                id
            );
            expect(actual.url).toBe("");
        });
    });

    describe("description, headline", () => {
        it("should map to description with headline followed by description", () => {
            const actual = mapSchemaOrgToDb(recipe, id);
            expect(actual.description).toBe(
                "It's a headline!\nIt's a description!"
            );
        });

        it("should map description to description when only description present", () => {
            const actual = mapSchemaOrgToDb(
                { ...recipe, headline: undefined },
                id
            );
            expect(actual.description).toBe("It's a description!");
        });

        it("should map headline to headline when only headline present", () => {
            const actual = mapSchemaOrgToDb(
                { ...recipe, description: undefined },
                id
            );
            expect(actual.description).toBe("It's a headline!");
        });

        it("should ignore values that are the same as the name of the recipe (case insensitive)", () => {
            const actual = mapSchemaOrgToDb(
                { ...recipe, headline: "eXAMPLE rECIPE" },
                id
            );
            expect(actual.description).toBe("It's a description!");
        });

        it("should be empty string when not present", () => {
            const actual = mapSchemaOrgToDb(
                { ...recipe, description: undefined, headline: undefined },
                id
            );
            expect(actual.description).toBe("");
        });
    });

    describe("recipeCategories, keywords, authors, publisher.name, datePublished", () => {
        it("should be mapped to tags", () => {
            const actual = mapSchemaOrgToDb(recipe, id);
            expect(actual.tags).toEqual([
                "Category A",
                "Category B",
                "Category C",
                "Category D",
                "author: Author A",
                "author: Author B",
                "author: Author C",
                "author url: http://www.example.com/profiles/talent/author_a",
                "author url: http://www.example.com/profiles/talent/author_b",
                "author url: http://www.example.com/profiles/talent/author_c",
                "publisher: Publisher A",
                "publisher url: https://www.example.com/publisher_a",
                "publish date: 2015-06-07T10:34:32.152-04:00",
            ]);
        });

        it("should not include fields that are not present", () => {
            const actual = mapSchemaOrgToDb(
                {
                    ...recipe,
                    authors: [
                        {
                            ...recipe.authors[0],
                            url: undefined,
                        },
                        {
                            ...recipe.authors[1],
                            name: undefined,
                        },
                        recipe.authors[2],
                    ],
                    publisher: {
                        ...(recipe.publisher as model.Organization),
                        name: undefined,
                        url: undefined,
                    },
                    datePublished: undefined,
                    keywords: undefined,
                },
                id
            );
            expect(actual.tags).toEqual([
                "Category A",
                "Category B",
                "author: Author A",
                "author: Author C",
                "author url: http://www.example.com/profiles/talent/author_b",
                "author url: http://www.example.com/profiles/talent/author_c",
            ]);
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

    describe("prepTime", () => {
        it("should be mapped to prepTime", () => {
            const actual = mapSchemaOrgToDb(recipe, id);
            expect(actual.prepTime).toBe("P0Y0M0DT2H40M0.000S");
        });

        it("should set prepTime to empty string when not present", () => {
            const actual = mapSchemaOrgToDb(
                { ...recipe, prepTime: undefined },
                id
            );
            expect(actual.prepTime).toBe("");
        });
    });

    describe("cookTime", () => {
        it("should be mapped to cookTime", () => {
            const actual = mapSchemaOrgToDb(recipe, id);
            expect(actual.cookTime).toBe("P0Y0M0DT0H20M0.000S");
        });

        it("should set prepTime to empty string when not present", () => {
            const actual = mapSchemaOrgToDb(
                { ...recipe, cookTime: undefined },
                id
            );
            expect(actual.cookTime).toBe("");
        });
    });

    describe("totalTime", () => {
        it("should be mapped to totalTime", () => {
            const actual = mapSchemaOrgToDb(recipe, id);
            expect(actual.totalTime).toBe("P0DT0H35M");
        });

        it("should set totalTime to empty string when not present", () => {
            const actual = mapSchemaOrgToDb(
                { ...recipe, totalTime: undefined },
                id
            );
            expect(actual.totalTime).toBe("");
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

    it("should have default values for other fields", () => {
        const actual = mapSchemaOrgToDb(recipe, id);
        expect(actual.servings).toBe("");
        expect(actual.ovenTemperature).toBe("");
        expect(actual.notes).toBe("");
        expect(actual.sourceText).toBe("");
    });
});

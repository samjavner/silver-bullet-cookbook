import { mapFromSchemaOrg } from "./mapFromSchemaOrg";
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
            url: undefined,
        },
        {
            name: undefined,
            url: "http://www.example.com/profiles/talent/author_c",
        },
        {
            name: undefined,
            url: undefined,
        },
    ],
    cookingMethods: [],
    cookTime: "P0Y0M0DT0H20M0.000S",
    dateModified: undefined,
    datePublished: "2015-06-07T10:34:32.152-04:00",
    description: "It's a description!",
    headline: "It's a headline!",
    images: [],
    keywords: "Keyword A, Keyword B",
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

describe("mapFromSchemaOrg", () => {
    describe("name", () => {
        it("should be name", () => {
            const actual = mapFromSchemaOrg(recipe);
            expect(actual.name).toBe("Example Recipe");
        });

        it("should set name to empty string when not present", () => {
            const actual = mapFromSchemaOrg({ ...recipe, name: undefined });
            expect(actual.name).toBe("");
        });
    });

    describe("url", () => {
        it("should be url", () => {
            const actual = mapFromSchemaOrg(recipe);
            expect(actual.url).toBe("https://www.example.com/recipe");
        });

        it("should be empty string when not present", () => {
            const actual = mapFromSchemaOrg({ ...recipe, url: undefined });
            expect(actual.url).toBe("");
        });
    });

    describe("description", () => {
        it("should be headline followed by description", () => {
            const actual = mapFromSchemaOrg(recipe);
            expect(actual.description).toBe(
                "It's a headline!\nIt's a description!"
            );
        });

        it("should be description when only description present", () => {
            const actual = mapFromSchemaOrg({ ...recipe, headline: undefined });
            expect(actual.description).toBe("It's a description!");
        });

        it("should be headline when only headline present", () => {
            const actual = mapFromSchemaOrg({
                ...recipe,
                description: undefined,
            });
            expect(actual.description).toBe("It's a headline!");
        });

        it("should ignore values that are the same as the name of the recipe (case insensitive)", () => {
            const actual = mapFromSchemaOrg({
                ...recipe,
                headline: "eXAMPLE rECIPE",
            });
            expect(actual.description).toBe("It's a description!");
        });

        it("should be empty string when not present", () => {
            const actual = mapFromSchemaOrg({
                ...recipe,
                description: undefined,
                headline: undefined,
            });
            expect(actual.description).toBe("");
        });
    });

    describe("ingredients", () => {
        it("should be recipeIngredients", () => {
            const actual = mapFromSchemaOrg(recipe);
            expect(actual.ingredients).toBe("Ingredient A\nIngredient B");
        });
    });

    describe("directions", () => {
        it("should be recipeInstructions", () => {
            const actual = mapFromSchemaOrg(recipe);
            expect(actual.directions).toBe("Instruction A\nInstruction B");
        });
    });

    describe("importWarnings", () => {
        it("should be warnings", () => {
            const actual = mapFromSchemaOrg(recipe);
            expect(actual.importWarnings).toEqual(["Warning A", "Warning B"]);
        });
    });

    describe("extras", () => {
        it("should have recipeCategories", () => {
            const actual = mapFromSchemaOrg(recipe);
            expect(actual.extras.recipeCategories).toEqual([
                "Category A",
                "Category B",
            ]);
        });

        describe("keywords", () => {
            it("should split values on comma", () => {
                const actual = mapFromSchemaOrg(recipe);
                expect(actual.extras.keywords).toEqual([
                    "Keyword A",
                    "Keyword B",
                ]);
            });

            it("should not be present when keywords is not present", () => {
                const actual = mapFromSchemaOrg({
                    ...recipe,
                    keywords: undefined,
                });
                expect(actual.extras.keywords).toBeUndefined();
            });
        });

        it("should have authorNames", () => {
            const actual = mapFromSchemaOrg(recipe);
            expect(actual.extras.authorNames).toEqual(["Author A", "Author B"]);
        });

        it("should have authorUrls", () => {
            const actual = mapFromSchemaOrg(recipe);
            expect(actual.extras.authorUrls).toEqual([
                "http://www.example.com/profiles/talent/author_a",
                "http://www.example.com/profiles/talent/author_c",
            ]);
        });

        describe("publisherName", () => {
            it("should be publisher.name", () => {
                const actual = mapFromSchemaOrg(recipe);
                expect(actual.extras.publisherName).toBe("Publisher A");
            });

            it("should not be present when there is no publisher", () => {
                const actual = mapFromSchemaOrg({
                    ...recipe,
                    publisher: undefined,
                });
                expect(actual.extras.publisherName).toBeUndefined();
            });
        });

        describe("publisherUrl", () => {
            it("should be publisher.url", () => {
                const actual = mapFromSchemaOrg(recipe);
                expect(actual.extras.publisherUrl).toBe(
                    "https://www.example.com/publisher_a"
                );
            });

            it("should not be present when there is no publisher", () => {
                const actual = mapFromSchemaOrg({
                    ...recipe,
                    publisher: undefined,
                });
                expect(actual.extras.publisherUrl).toBeUndefined();
            });
        });

        it("should have datePublished", () => {
            const actual = mapFromSchemaOrg(recipe);
            expect(actual.extras.datePublished).toBe(
                "2015-06-07T10:34:32.152-04:00"
            );
        });

        it("should have recipeYield", () => {
            const actual = mapFromSchemaOrg(recipe);
            expect(actual.extras.recipeYield).toBe("12 large pretzels");
        });

        it("should have prepTime", () => {
            const actual = mapFromSchemaOrg(recipe);
            expect(actual.extras.prepTime).toBe("P0Y0M0DT2H40M0.000S");
        });

        it("should have cookTime", () => {
            const actual = mapFromSchemaOrg(recipe);
            expect(actual.extras.cookTime).toBe("P0Y0M0DT0H20M0.000S");
        });

        it("should have totalTime", () => {
            const actual = mapFromSchemaOrg(recipe);
            expect(actual.extras.totalTime).toBe("P0DT0H35M");
        });
    });
});

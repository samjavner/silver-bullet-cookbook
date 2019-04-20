import { mapFromPaprika } from "./mapFromPaprika";
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

describe("mapFromPaprika", () => {
    describe("name", () => {
        it("should be name", () => {
            const actual = mapFromPaprika(recipe);
            expect(actual.name).toBe("Example Recipe");
        });

        it("should set name to empty string when not present", () => {
            const actual = mapFromPaprika({ ...recipe, name: undefined });
            expect(actual.name).toBe("");
        });
    });

    describe("url", () => {
        it("should be sourceUrl", () => {
            const actual = mapFromPaprika(recipe);
            expect(actual.url).toBe("https://www.example.com/source_url");
        });

        it("should be empty string when not present", () => {
            const actual = mapFromPaprika({ ...recipe, sourceUrl: undefined });
            expect(actual.url).toBe("");
        });
    });

    describe("description", () => {
        it("should be empty string", () => {
            const actual = mapFromPaprika(recipe);
            expect(actual.description).toBe("");
        });
    });

    describe("ingredients", () => {
        it("should be mapped to ingredients", () => {
            const actual = mapFromPaprika(recipe);
            expect(actual.ingredients).toEqual("Ingredient A\nIngredient B");
        });

        it("should set ingredients to empty string when not present", () => {
            const actual = mapFromPaprika({
                ...recipe,
                ingredients: undefined,
            });
            expect(actual.ingredients).toBe("");
        });
    });

    describe("directions", () => {
        it("should be mapped to directions", () => {
            const actual = mapFromPaprika(recipe);
            expect(actual.directions).toEqual("Direction A\n\nDirection B");
        });

        it("should set directions to empty string when not present", () => {
            const actual = mapFromPaprika({ ...recipe, directions: undefined });
            expect(actual.directions).toBe("");
        });
    });

    describe("importWarnings", () => {
        it("should be empty array", () => {
            const actual = mapFromPaprika(recipe);
            expect(actual.importWarnings).toEqual([]);
        });
    });

    describe("extras", () => {
        it("should have categories", () => {
            const actual = mapFromPaprika(recipe);
            expect(actual.extras.categories).toEqual([
                "Category A",
                "Category B",
            ]);
        });

        it("should have difficulty", () => {
            const actual = mapFromPaprika(recipe);
            expect(actual.extras.difficulty).toBe("Easy");
        });

        it("should have source", () => {
            const actual = mapFromPaprika(recipe);
            expect(actual.extras.source).toBe("Source A");
        });

        it("should have servings", () => {
            const actual = mapFromPaprika(recipe);
            expect(actual.extras.servings).toBe("4 servings");
        });

        it("should have prepTime", () => {
            const actual = mapFromPaprika(recipe);
            expect(actual.extras.prepTime).toBe("20 mins");
        });

        it("should have cookTime", () => {
            const actual = mapFromPaprika(recipe);
            expect(actual.extras.cookTime).toBe("25 mins");
        });

        it("should have notes", () => {
            const actual = mapFromPaprika(recipe);
            expect(actual.extras.notes).toBe("Note A\n\nNote B");
        });
    });
});

import { recipe1 } from "../../db/recipe.mock";
import * as recipeEdit from "./recipeEdit";

describe("recipeEdit", () => {
    describe("selectors", () => {
        describe("isValid", () => {
            it("is valid when the name has a non-whitespace character", () => {
                const actual = recipeEdit.isValid({
                    ...recipe1,
                    name: "Test Recipe",
                });
                expect(actual).toBe(true);
            });

            it("is invalid when the name is only whitespace", () => {
                const actual = recipeEdit.isValid({
                    ...recipe1,
                    name: "    ",
                });
                expect(actual).toBe(false);
            });
        });
    });

    describe("update", () => {
        it("should handle setName", () => {
            const actual = recipeEdit.update.setName(
                recipe1,
                "This is the new name"
            );
            expect(actual.name).toBe("This is the new name");
        });

        it("should handle setUrl", () => {
            const actual = recipeEdit.update.setUrl(
                recipe1,
                "https://example.com/new_url"
            );
            expect(actual.url).toBe("https://example.com/new_url");
        });

        it("should handle setDescription", () => {
            const actual = recipeEdit.update.setDescription(
                recipe1,
                "This is the new description"
            );
            expect(actual.description).toBe("This is the new description");
        });

        it("should handle setServings", () => {
            const actual = recipeEdit.update.setServings(recipe1, "96");
            expect(actual.servings).toBe("96");
        });

        it("should handle setYield", () => {
            const actual = recipeEdit.update.setYield(recipe1, "96 cups");
            expect(actual.yield).toBe("96 cups");
        });

        it("should handle setPrepTime", () => {
            const actual = recipeEdit.update.setPrepTime(recipe1, "5:42");
            expect(actual.prepTime).toBe("5:42");
        });

        it("should handle setCookTime", () => {
            const actual = recipeEdit.update.setCookTime(recipe1, "5:42");
            expect(actual.cookTime).toBe("5:42");
        });

        it("should handle setTotalTime", () => {
            const actual = recipeEdit.update.setTotalTime(recipe1, "5:42");
            expect(actual.totalTime).toBe("5:42");
        });

        it("should handle setOvenTemperature", () => {
            const actual = recipeEdit.update.setOvenTemperature(
                recipe1,
                "487F"
            );
            expect(actual.ovenTemperature).toBe("487F");
        });

        it("should handle setNotes", () => {
            const actual = recipeEdit.update.setNotes(
                recipe1,
                "This are the new notes"
            );
            expect(actual.notes).toBe("This are the new notes");
        });

        it("should handle setIngredients", () => {
            const actual = recipeEdit.update.setIngredients(
                recipe1,
                "New ingredients!"
            );
            expect(actual.ingredients).toBe("New ingredients!");
        });

        it("should handle setDirections", () => {
            const actual = recipeEdit.update.setDirections(
                recipe1,
                "New directions!"
            );
            expect(actual.directions).toBe("New directions!");
        });
    });
});

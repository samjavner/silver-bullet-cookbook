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

        it("should handle setNotes", () => {
            const actual = recipeEdit.update.setNotes(
                recipe1,
                "This is the new notes"
            );
            expect(actual.notes).toBe("This is the new notes");
        });
    });
});

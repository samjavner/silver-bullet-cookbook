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

import * as recipeEdit from "./recipeEdit";

const example: recipeEdit.Model = {
    id: "0fd55934-3370-44ab-8f4b-6cdd09b796f2",
    name: "Test Recipe",
    ingredients: "Ingredient a\nIngredient b",
    directions: "Direction a\nDirection b",
};

describe("recipeEdit", () => {
    describe("selectors", () => {
        describe("isValid", () => {
            it("is valid when the name has a non-whitespace character", () => {
                const actual = recipeEdit.isValid({
                    ...example,
                    name: "Test Recipe",
                });
                expect(actual).toBe(true);
            });

            it("is invalid when the name is only whitespace", () => {
                const actual = recipeEdit.isValid({
                    ...example,
                    name: "    ",
                });
                expect(actual).toBe(false);
            });
        });
    });

    describe("update", () => {
        it("should handle setName", () => {
            const actual = recipeEdit.update.setName(
                example,
                "This is the new name"
            );
            expect(actual.name).toBe("This is the new name");
        });

        it("should handle setIngredients", () => {
            const actual = recipeEdit.update.setIngredients(
                example,
                "New ingredients!"
            );
            expect(actual.ingredients).toBe("New ingredients!");
        });

        it("should handle setDirections", () => {
            const actual = recipeEdit.update.setDirections(
                example,
                "New directions!"
            );
            expect(actual.directions).toBe("New directions!");
        });
    });
});

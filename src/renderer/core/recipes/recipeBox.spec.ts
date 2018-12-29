import * as sqlite from "sqlite";
import { putMultiple, Recipe } from "../../db/recipe";
import { MockDispatch, mockDispatch, useTestStore } from "../../store/test";
import { useCommandProvider } from "../commandProvider";
import * as recipeBox from "./recipeBox";

describe("recipeBox", () => {
    describe("update", () => {
        it("should handle refreshSuccess", () => {
            const recipes = [
                {
                    id: "a5e692ac-fbef-40e0-ad59-270ca75476a4",
                    name: "Test Recipe!",
                    ingredients: "Ingredient a\nIngredient b",
                    directions: "Direction a\nDirection b",
                },
            ];
            const actual = recipeBox.update.refreshSuccess(
                recipeBox.init,
                recipes
            );
            expect(actual.recipes).toEqual(recipes);
        });

        it("should handle setSelectedIndex", () => {
            const actual = recipeBox.update.setSelectedIndex(
                recipeBox.init,
                100
            );
            expect(actual.selectedIndex).toEqual(100);
        });

        it("should handle openAddRecipe", () => {
            const actual = recipeBox.update.openAddRecipe(recipeBox.init);
            expect(actual.isAddRecipeActive).toEqual(true);
        });

        it("should handle closeAddRecipe", () => {
            const actual = recipeBox.update.closeAddRecipe({
                ...recipeBox.init,
                isAddRecipeActive: true,
            });
            expect(actual.isAddRecipeActive).toEqual(false);
        });

        it("should handle openEditRecipe", () => {
            const actual = recipeBox.update.openEditRecipe(recipeBox.init);
            expect(actual.isEditRecipeActive).toEqual(true);
        });

        it("should handle closeEditRecipe", () => {
            const actual = recipeBox.update.closeEditRecipe({
                ...recipeBox.init,
                isEditRecipeActive: true,
            });
            expect(actual.isEditRecipeActive).toEqual(false);
        });
    });

    describe("commands", () => {
        const mock: MockDispatch<
            recipeBox.Model,
            recipeBox.Update
        > = mockDispatch(recipeBox.init, recipeBox.update);
        let db: sqlite.Database;
        let commands: recipeBox.Commands;

        beforeEach(async () => {
            db = await sqlite.open(":memory:");
            await db.migrate({ migrationsPath: "static/migrations" });
            const commandProvider = useCommandProvider(useTestStore, db);
            commands = recipeBox.createCommands(commandProvider, db)(
                recipeBox.init,
                mock.dispatch
            );
            mock.reset();
        });

        afterEach(async () => {
            db.close();
        });

        describe("refresh", () => {
            it("should get all recipes from the database and then dispatch refreshSuccess", async () => {
                const test: Recipe[] = [
                    {
                        id: "48e1a9ca-b128-41dd-83c3-d79d8133a209",
                        name: "Test Recipe 1",
                        ingredients: "Ingredient 1a\nIngredient 1b",
                        directions: "Direction 1a\nDirection 1b",
                    },
                    {
                        id: "d4101c33-3ed0-471f-af6e-aff7ecd988cf",
                        name: "Test Recipe 2",
                        ingredients: "Ingredient 2a\nIngredient 2b",
                        directions: "Direction 2a\nDirection 2b",
                    },
                ];
                await putMultiple(db, test);
                await commands.refresh();
                expect(mock.history.messages).toEqual([
                    ["refreshSuccess", test],
                ]);
            });
        });

        describe("saveAddRecipe", () => {
            it("should save the recipe, refresh the recipes, and then dispatch closeAddRecipe", async () => {
                const test1: Recipe = {
                    id: "48e1a9ca-b128-41dd-83c3-d79d8133a209",
                    name: "Test Recipe 1",
                    ingredients: "Ingredient 1a\nIngredient 1b",
                    directions: "Direction 1a\nDirection 1b",
                };
                const test2: Recipe = {
                    id: "d4101c33-3ed0-471f-af6e-aff7ecd988cf",
                    name: "Test Recipe 2",
                    ingredients: "Ingredient 2a\nIngredient 2b",
                    directions: "Direction 2a\nDirection 2b",
                };
                await commands.saveAddRecipe(test1);
                await commands.saveAddRecipe(test2);
                expect(mock.history.messages).toEqual([
                    ["refreshSuccess", [test1]],
                    ["closeAddRecipe", undefined],
                    ["refreshSuccess", [test1, test2]],
                    ["closeAddRecipe", undefined],
                ]);
            });
        });

        describe("addMultiple", () => {
            it("should save multiple recipes and then dispatch refresh", async () => {
                const test1: Recipe = {
                    id: "0033d412-ab27-479b-98ba-ca8c5b71a635",
                    name: "Test Recipe 1",
                    ingredients: "Ingredient 1a\nIngredient 1b",
                    directions: "Direction 1a\nDirection 1b",
                };
                const test2: Recipe = {
                    id: "22f22dae-a73b-4b61-8012-a653121f3998",
                    name: "Test Recipe 2",
                    ingredients: "Ingredient 2a\nIngredient 2b",
                    directions: "Direction 2a\nDirection 2b",
                };
                const test3: Recipe = {
                    id: "48e1a9ca-b128-41dd-83c3-d79d8133a209",
                    name: "Test Recipe 3",
                    ingredients: "Ingredient 3a\nIngredient 3b",
                    directions: "Direction 3a\nDirection 3b",
                };
                const test4: Recipe = {
                    id: "d4101c33-3ed0-471f-af6e-aff7ecd988cf",
                    name: "Test Recipe 4",
                    ingredients: "Ingredient 4a\nIngredient 4b",
                    directions: "Direction 4a\nDirection 4b",
                };
                await commands.addMultiple([test1, test2]);
                await commands.addMultiple([test3, test4]);
                expect(mock.history.messages).toEqual([
                    ["refreshSuccess", [test1, test2]],
                    ["refreshSuccess", [test1, test2, test3, test4]],
                ]);
            });
        });
    });
});

import * as sqlite from "sqlite";
import { putMultiple, Recipe } from "../../db/recipe";
import { recipe1, recipe2, recipe3, recipe4 } from "../../db/recipe.mock";
import { MockDispatch, mockDispatch, useTestStore } from "../../store/test";
import { useCommandProvider } from "../commandProvider";
import * as recipeBox from "./recipeBox";

describe("recipeBox", () => {
    describe("update", () => {
        it("should handle refreshSuccess", () => {
            const recipes = [recipe1];
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
                const recipes: Recipe[] = [recipe1, recipe2];
                await putMultiple(db, recipes);
                await commands.refresh();
                expect(mock.history.messages).toEqual([
                    ["refreshSuccess", recipes],
                ]);
            });
        });

        describe("saveAddRecipe", () => {
            it("should save the recipe, refresh the recipes, and then dispatch closeAddRecipe", async () => {
                await commands.saveAddRecipe(recipe1);
                await commands.saveAddRecipe(recipe2);
                expect(mock.history.messages).toEqual([
                    ["refreshSuccess", [recipe1]],
                    ["closeAddRecipe", undefined],
                    ["refreshSuccess", [recipe1, recipe2]],
                    ["closeAddRecipe", undefined],
                ]);
            });
        });

        describe("saveEditRecipe", () => {
            it("should save the recipe, refresh the recipes, and then dispatch closeEditRecipe", async () => {
                await commands.saveAddRecipe(recipe1);

                const updated1: Recipe = {
                    ...recipe1,
                    name: "Test Recipe One",
                };
                await commands.saveEditRecipe(updated1);

                expect(mock.history.messages).toEqual([
                    ["refreshSuccess", [recipe1]],
                    ["closeAddRecipe", undefined],
                    ["refreshSuccess", [updated1]],
                    ["closeEditRecipe", undefined],
                ]);
            });
        });

        describe("addMultiple", () => {
            it("should save multiple recipes and then dispatch refresh", async () => {
                await commands.addMultiple([recipe1, recipe2]);
                await commands.addMultiple([recipe3, recipe4]);
                expect(mock.history.messages).toEqual([
                    ["refreshSuccess", [recipe1, recipe2]],
                    ["refreshSuccess", [recipe1, recipe2, recipe3, recipe4]],
                ]);
            });
        });
    });
});

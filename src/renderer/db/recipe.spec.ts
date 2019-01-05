import * as sqlite from "sqlite";
import * as recipe from "./recipe";
import { recipe1, recipe2 } from "./recipe.mock";

describe("db/recipe", () => {
    let db: sqlite.Database;

    beforeEach(async () => {
        db = await sqlite.open(":memory:");
        await db.migrate({ migrationsPath: "static/migrations" });
    });

    afterEach(async () => {
        db.close();
    });

    it("should be able to put a recipe and get it back", async () => {
        await recipe.put(db, recipe1);
        const actual = await recipe.getById(db, recipe1.id);
        expect(actual).toEqual(recipe1);
    });

    it("should be able to delete a recipe and then getById should return undefined", async () => {
        await recipe.put(db, recipe1);
        await recipe.remove(db, recipe1);
        const actual = await recipe.getById(db, recipe1.id);
        expect(actual).toBeUndefined();
    });

    it("should be able to overwrite an existing recipe", async () => {
        await recipe.put(db, recipe1);
        const updated: recipe.Recipe = {
            ...recipe1,
            name: "New Name!",
        };
        await recipe.put(db, updated);
        const actual = await recipe.getById(db, recipe1.id);
        expect((actual as recipe.Recipe).name).toBe("New Name!");
    });

    it("should be able to put multiple recipes and get them all back", async () => {
        const recipes: recipe.Recipe[] = [recipe1, recipe2];
        await recipe.putMultiple(db, recipes);
        const actual = await recipe.getAll(db);
        expect(actual.sort((a, b) => (a.id > b.id ? 1 : -1))).toEqual(recipes);
    });
});

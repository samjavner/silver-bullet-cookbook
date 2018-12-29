import * as sqlite from "sqlite";
import * as recipe from "./recipe";

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
        const id = "48e1a9ca-b128-41dd-83c3-d79d8133a209";
        const test: recipe.Recipe = {
            id,
            name: "Test Recipe",
            ingredients: "Ingredient 1\nIngredient 2",
            directions: "Direction 1\nDirection 2",
        };
        await recipe.put(db, test);
        const actual = await recipe.getById(db, id);
        expect(actual).toEqual(test);
    });

    it("should be able to delete a recipe and then getById should return undefined", async () => {
        const id = "48e1a9ca-b128-41dd-83c3-d79d8133a209";
        const test: recipe.Recipe = {
            id,
            name: "Test Recipe",
            ingredients: "Ingredient 1\nIngredient 2",
            directions: "Direction 1\nDirection 2",
        };
        await recipe.put(db, test);
        await recipe.remove(db, test);
        const actual = await recipe.getById(db, id);
        expect(actual).toBeUndefined();
    });

    it("should be able to overwrite an existing recipe", async () => {
        const id = "48e1a9ca-b128-41dd-83c3-d79d8133a209";
        const test: recipe.Recipe = {
            id,
            name: "Test Recipe",
            ingredients: "Ingredient 1\nIngredient 2",
            directions: "Direction 1\nDirection 2",
        };
        await recipe.put(db, test);
        test.name = "New Name!";
        await recipe.put(db, test);
        const actual = await recipe.getById(db, id);
        expect((actual as recipe.Recipe).name).toBe("New Name!");
    });

    it("should be able to put multiple recipes and get them all back", async () => {
        const test: recipe.Recipe[] = [
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
        await recipe.putMultiple(db, test);
        const actual = await recipe.getAll(db);
        expect(actual.sort((a, b) => (a.id > b.id ? 1 : -1))).toEqual(test);
    });
});

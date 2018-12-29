import SQL from "sql-template-strings";
import sqlite from "sqlite";

export interface Recipe {
    id: string;
    name: string;
    ingredients: string;
    directions: string;
}

export async function putMultiple(
    db: sqlite.Database,
    recipes: Recipe[]
): Promise<void> {
    for (const recipe of recipes) {
        await put(db, recipe);
    }
}

export async function put(db: sqlite.Database, recipe: Recipe): Promise<void> {
    await db.run(
        SQL`REPLACE INTO Recipe (id, name, ingredients, directions) VALUES (${
            recipe.id
        }, ${recipe.name}, ${recipe.ingredients}, ${recipe.directions})`
    );
}

export async function remove(
    db: sqlite.Database,
    recipe: Recipe
): Promise<void> {
    await db.run(SQL`DELETE FROM Recipe WHERE id = ${recipe.id}`);
}

export async function getAll(db: sqlite.Database): Promise<Recipe[]> {
    return db.all(SQL`SELECT * FROM Recipe`);
}

export async function getById(
    db: sqlite.Database,
    id: string
): Promise<Recipe | undefined> {
    return db.get(SQL`SELECT * FROM Recipe WHERE id = ${id}`);
}

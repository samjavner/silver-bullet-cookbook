import SQL from "sql-template-strings";
import sqlite from "sqlite";

export interface Recipe {
    id: string;
    name: string;
    url: string;
    description: string;
    tags: string[];
    ingredients: string;
    directions: string;
    notes: string;
    sourceText: string;
    importWarnings: string[];
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
    const tags = recipe.tags.join(";");
    const importWarnings = recipe.importWarnings.join(";");
    await db.run(
        SQL`REPLACE INTO Recipe (id, name, url, description, tags, ingredients, directions, notes, sourceText, importWarnings) VALUES (${
            recipe.id
        }, ${recipe.name}, ${recipe.url}, ${recipe.description}, ${tags}, ${
            recipe.ingredients
        }, ${recipe.directions}, ${recipe.notes}, ${
            recipe.sourceText
        }, ${importWarnings})`
    );
}

export async function remove(
    db: sqlite.Database,
    recipe: Recipe
): Promise<void> {
    await db.run(SQL`DELETE FROM Recipe WHERE id = ${recipe.id}`);
}

export async function getAll(db: sqlite.Database): Promise<Recipe[]> {
    const recipes = await db.all(SQL`SELECT * FROM Recipe`);
    return recipes.map(mapDbRecipe);
}

export async function getById(
    db: sqlite.Database,
    id: string
): Promise<Recipe | undefined> {
    const recipe = await db.get(SQL`SELECT * FROM Recipe WHERE id = ${id}`);
    return recipe ? mapDbRecipe(recipe) : undefined;
}

function mapDbRecipe(recipe: any): Recipe {
    return {
        id: recipe.id,
        name: recipe.name,
        url: recipe.url,
        description: recipe.description,
        tags: (recipe.tags as string).split(";").filter(x => x),
        ingredients: recipe.ingredients,
        directions: recipe.directions,
        notes: recipe.notes,
        sourceText: recipe.sourceText,
        importWarnings: (recipe.importWarnings as string)
            .split(";")
            .filter(x => x),
    };
}

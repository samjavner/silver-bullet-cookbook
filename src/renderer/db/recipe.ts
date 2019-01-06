import SQL from "sql-template-strings";
import sqlite from "sqlite";

export interface Recipe {
    id: string;
    name: string;
    ingredients: string;
    directions: string;
    servings: string;
    yield: string;
    categories: string[];
    source: string;
    author: string;
    webPage: string;
    sourcePageNumber: string;
    copyright: string;
    publisher: string;
    publishDate: string;
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
    const categories = recipe.categories.join(";");
    const importWarnings = recipe.importWarnings.join(";");
    await db.run(
        SQL`REPLACE INTO Recipe (id, name, ingredients, directions, servings, yield, categories, source, author, webPage, sourcePageNumber, copyright, publisher, publishDate, sourceText, importWarnings) VALUES (${
            recipe.id
        }, ${recipe.name}, ${recipe.ingredients}, ${recipe.directions}, ${
            recipe.servings
        }, ${recipe.yield}, ${categories}, ${recipe.source}, ${
            recipe.author
        }, ${recipe.webPage}, ${recipe.sourcePageNumber}, ${
            recipe.copyright
        }, ${recipe.publisher}, ${recipe.publishDate}, ${
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
        ingredients: recipe.ingredients,
        directions: recipe.directions,
        servings: recipe.servings,
        yield: recipe.yield,
        categories: (recipe.categories as string).split(";").filter(x => x),
        sourceText: recipe.sourceText,
        source: recipe.source,
        author: recipe.author,
        webPage: recipe.webPage,
        sourcePageNumber: recipe.sourcePageNumber,
        copyright: recipe.copyright,
        publisher: recipe.publisher,
        publishDate: recipe.publishDate,
        importWarnings: (recipe.importWarnings as string)
            .split(";")
            .filter(x => x),
    };
}

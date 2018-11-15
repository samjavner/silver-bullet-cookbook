import sqlite from "sqlite";

declare const __static: string;

export async function sqliteTest() {
    const db = await sqlite.open(":memory:");

    await db.migrate({ migrationsPath: `${__static}/migrations` });

    await db.each("SELECT id, name FROM Category", (err, row) => {
        // tslint:disable-next-line:no-console
        console.log(row.id + ": " + row.name);
    });

    await db.close();
}

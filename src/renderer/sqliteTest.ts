import { remote } from "electron";
import path from "path";
import sqlite3 from "sqlite3";

const dbPath = path.join(remote.app.getPath("userData"), "index.db");
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
    db.run("CREATE TABLE lorem (info TEXT)");

    const stmt = db.prepare("INSERT INTO lorem VALUES (?)");
    for (let i = 0; i < 10; i++) {
        stmt.run("Ipsum " + i);
    }
    stmt.finalize();

    db.each("SELECT rowid AS id, info FROM lorem", (err, row) => {
        // tslint:disable-next-line:no-console
        console.log(row.id + ": " + row.info);
    });

    alert("got it!");
});

db.close();

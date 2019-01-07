-- Up 

CREATE TABLE Recipe
(
    id                  TEXT PRIMARY KEY NOT NULL,
    name                TEXT NOT NULL,
    ingredients         TEXT NOT NULL,
    directions          TEXT NOT NULL,
    servings            TEXT NOT NULL,
    yield               TEXT NOT NULL,
    categories          TEXT NOT NULL,
    source              TEXT NOT NULL,
    author              TEXT NOT NULL,
    webPage             TEXT NOT NULL,
    sourcePageNumber    TEXT NOT NULL,
    copyright           TEXT NOT NULL,
    publisher           TEXT NOT NULL,
    publishDate         TEXT NOT NULL,
    sourceText          TEXT NOT NULL,
    importWarnings      TEXT NOT NULL
);

CREATE INDEX IDX_RECIPE_ID ON Recipe (id ASC);

-- Down

DROP TABLE Recipe;

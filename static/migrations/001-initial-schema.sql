-- Up 

CREATE TABLE Recipe
(
    id                  TEXT PRIMARY KEY NOT NULL,
    name                TEXT NOT NULL,
    url                 TEXT NOT NULL,
    description         TEXT NOT NULL,
    tags                TEXT NOT NULL,
    servings            TEXT NOT NULL,
    yield               TEXT NOT NULL,
    prepTime            TEXT NOT NULL,
    cookTime            TEXT NOT NULL,
    totalTime           TEXT NOT NULL,
    ovenTemperature     TEXT NOT NULL,
    notes               TEXT NOT NULL,
    ingredients         TEXT NOT NULL,
    directions          TEXT NOT NULL,
    sourceText          TEXT NOT NULL,
    importWarnings      TEXT NOT NULL
);

CREATE INDEX IDX_RECIPE_ID ON Recipe (id ASC);

-- Down

DROP TABLE Recipe;

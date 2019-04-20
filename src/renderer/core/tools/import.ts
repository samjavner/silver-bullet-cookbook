import { remote } from "electron";
import * as uuid from "uuid";
import { Recipe } from "../../db/recipe";
import * as fdx from "../../formats/fdx";
import { mapFromFdx } from "../../formats/fdx/mapFromFdx";
import { mapFromMmf } from "../../formats/mmf/mapFromMmf";
import * as mmf from "../../formats/mmf/parser";
import { ImportRecipe } from "../../formats/model";
import * as mx2 from "../../formats/mx2";
import { mapFromMx2 } from "../../formats/mx2/mapFromMx2";
import { mapFromMxp } from "../../formats/mxp/mapFromMxp";
import * as mxp from "../../formats/mxp/parser";
import { mapFromPaprika } from "../../formats/paprika/mapFromPaprika";
import * as paprika from "../../formats/paprika/parser";
import * as schemaOrg from "../../formats/schema.org";
import { mapFromSchemaOrg } from "../../formats/schema.org/mapFromSchemaOrg";
import { Dispatch, Store, UseStore } from "../../store";
import { RecipeBox } from "../recipes/recipeBox";

export type Import = Store<Model, Update, Commands>;

export function useImport(
    useStore: UseStore<Model, Update, Commands>,
    recipeBox: RecipeBox
): Import {
    return useStore({
        init,
        update,
        createCommands: createCommands(recipeBox),
        memo: [recipeBox],
    });
}

// MODEL

export interface Model {
    isImporting: boolean;
}

export const init: Model = {
    isImporting: false,
};

// UPDATE

type Update = typeof update;

export const update = {
    importRequest(model: Model): Model {
        return {
            ...model,
            isImporting: true,
        };
    },
    importSuccess(model: Model): Model {
        return {
            ...model,
            isImporting: false,
        };
    },
};

// COMMANDS

type Commands = ReturnType<ReturnType<typeof createCommands>>;

export const createCommands = (recipeBox: RecipeBox) => (
    model: Model,
    dispatch: Dispatch<Update>
) => {
    async function importRecipes() {
        const paths = remote.dialog.showOpenDialog(remote.getCurrentWindow(), {
            filters: [
                {
                    name: "Recipe files",
                    extensions: [
                        "fdx",
                        "json",
                        "mmf",
                        "mx2",
                        "mxp",
                        "paprikarecipes",
                    ],
                },
            ],
        });

        if (!paths || paths.length === 0) {
            return;
        }

        await dispatch.importRequest();
        const path = paths[0];

        async function getRecipes(): Promise<ImportRecipe[]> {
            const extension = path
                .slice(path.lastIndexOf(".") + 1)
                .toLowerCase();

            switch (extension) {
                case "mmf":
                    const mmfRecipes = mmf.parseFileWithSource(path);
                    return mmfRecipes.map(([source, recipe]) =>
                        mapFromMmf(recipe)
                    );
                case "mxp":
                    const mxpRecipes = mxp.parseFileWithSource(path);
                    return mxpRecipes.map(([source, recipe]) =>
                        mapFromMxp(recipe)
                    );
                case "mx2":
                    const mx2Recipes = await mx2.parseFile(path);
                    return mx2Recipes.recipes.map(recipe =>
                        mapFromMx2(recipe, mx2Recipes)
                    );
                case "fdx":
                    const fdxRecipes = await fdx.parseFile(path);
                    return fdxRecipes.recipes.map(recipe =>
                        mapFromFdx(recipe, fdxRecipes)
                    );
                case "paprikarecipes":
                    const paprikaRecipes = paprika.parseFile(path);
                    return paprikaRecipes.map(recipe => mapFromPaprika(recipe));
                case "json":
                    const schemaOrgRecipes = schemaOrg.parseFile(path);
                    return schemaOrgRecipes.map(recipe =>
                        mapFromSchemaOrg(recipe)
                    );
                default:
                    return [];
            }
        }

        const recipes = await getRecipes();
        const dbRecipes = recipes.map<Recipe>(recipe => {
            const { extras, name, ...fields } = recipe;

            const tags: string[] = [];
            Object.keys(extras).forEach(extra => {
                const value = extras[extra];
                const values = value
                    ? typeof value === "string"
                        ? [value]
                        : value
                    : [];
                values.forEach(val => {
                    tags.push(`${extra}: ${val}`);
                });
            });

            return {
                id: uuid.v4(),
                name: name || "Imported Recipe",
                ...fields,
                tags,
                notes: "",
                sourceText: "",
            };
        });
        await recipeBox.addMultiple(dbRecipes);
        await dispatch.importSuccess();
    }

    return {
        import: importRecipes,
    };
};

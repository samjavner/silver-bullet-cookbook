import { remote } from "electron";
import * as uuid from "uuid";
import { Recipe } from "../../db/recipe";
import * as fdx from "../../formats/fdx";
import { mapFdxToDb } from "../../formats/fdx/mapFdxToDb";
import { mapMmfToDb } from "../../formats/mmf/mapMmfToDb";
import * as mmf from "../../formats/mmf/parser";
import * as mx2 from "../../formats/mx2";
import { mapMx2ToDb } from "../../formats/mx2/mapMx2ToDb";
import { mapMxpToDb } from "../../formats/mxp/mapMxpToDb";
import * as mxp from "../../formats/mxp/parser";
import { mapPaprikaToDb } from "../../formats/paprika/mapPaprikaToDb";
import * as paprika from "../../formats/paprika/parser";
import * as schemaOrg from "../../formats/schema.org";
import { mapSchemaOrgToDb } from "../../formats/schema.org/mapSchemaOrgToDb";
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

        async function getRecipes(): Promise<Recipe[]> {
            const extension = path
                .slice(path.lastIndexOf(".") + 1)
                .toLowerCase();

            switch (extension) {
                case "mmf":
                    const mmfRecipes = mmf.parseFileWithSource(path);
                    return mmfRecipes.map(([source, recipe]) =>
                        mapMmfToDb(recipe, source, uuid.v4())
                    );
                case "mxp":
                    const mxpRecipes = mxp.parseFileWithSource(path);
                    return mxpRecipes.map(([source, recipe]) =>
                        mapMxpToDb(recipe, source, uuid.v4())
                    );
                case "mx2":
                    const mx2Recipes = await mx2.parseFile(path);
                    return mx2Recipes.recipes.map(recipe =>
                        mapMx2ToDb(recipe, mx2Recipes, uuid.v4())
                    );
                case "fdx":
                    const fdxRecipes = await fdx.parseFile(path);
                    return fdxRecipes.recipes.map(recipe =>
                        mapFdxToDb(recipe, fdxRecipes, uuid.v4())
                    );
                case "paprikarecipes":
                    const paprikaRecipes = paprika.parseFile(path);
                    return paprikaRecipes.map(recipe =>
                        mapPaprikaToDb(recipe, uuid.v4())
                    );
                case "json":
                    const schemaOrgRecipes = schemaOrg.parseFile(path);
                    return schemaOrgRecipes.map(recipe =>
                        mapSchemaOrgToDb(recipe, uuid.v4())
                    );
                default:
                    return [];
            }
        }

        const recipes = await getRecipes();
        await recipeBox.addMultiple(recipes);
        await dispatch.importSuccess();
    }

    return {
        import: importRecipes,
    };
};

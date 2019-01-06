import { remote } from "electron";
import * as uuid from "uuid";
import * as fdx from "../../formats/fdx";
import { mapMmfToDb } from "../../formats/mmf/mapMmfToDb";
import * as mmf from "../../formats/mmf/parser";
import * as mx2 from "../../formats/mx2";
import { mapMxpToDb } from "../../formats/mxp/mapMxpToDb";
import * as mxp from "../../formats/mxp/parser";
import { mapPaprikaToDb } from "../../formats/paprika/mapPaprikaToDb";
import * as paprika from "../../formats/paprika/parser";
import * as schemaorg from "../../formats/schema.org";
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

        if (path.toLowerCase().endsWith(".mmf")) {
            const recipes = mmf.parseFileWithSource(path);
            await recipeBox.addMultiple(
                recipes.map(([source, recipe]) =>
                    mapMmfToDb(recipe, source, uuid.v4())
                )
            );
        } else if (path.toLowerCase().endsWith(".mxp")) {
            const recipes = mxp.parseFileWithSource(path);
            await recipeBox.addMultiple(
                recipes.map(([source, recipe]) =>
                    mapMxpToDb(recipe, source, uuid.v4())
                )
            );
        } else if (path.toLowerCase().endsWith(".mx2")) {
            const recipes = await mx2.parseFile(path);
            // tslint:disable-next-line:no-console
            console.log(recipes);
        } else if (path.toLowerCase().endsWith(".fdx")) {
            const recipes = await fdx.parseFile(path);
            // tslint:disable-next-line:no-console
            console.log(recipes);
        } else if (path.toLowerCase().endsWith(".paprikarecipes")) {
            const recipes = paprika.parseFile(path);
            await recipeBox.addMultiple(
                recipes.map(recipe => mapPaprikaToDb(recipe, uuid.v4()))
            );
        } else if (path.toLowerCase().endsWith(".json")) {
            const recipes = schemaorg.parseFile(path);
            // tslint:disable-next-line:no-console
            console.log(recipes);
        }

        await dispatch.importSuccess();
    }

    return {
        import: importRecipes,
    };
};

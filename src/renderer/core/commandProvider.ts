import * as sqlite from "sqlite";
import * as recipe from "../db/recipe";
import { Dispatch, Store, UseStore } from "../store";

export type CommandProvider = Store<Model, Update, Commands>;

export function useCommandProvider(
    useStore: UseStore<Model, Update, Commands>,
    db: sqlite.Database
): CommandProvider {
    return useStore({
        init,
        update,
        createCommands: createCommands(db),
        memo: [db],
    });
}

// MODEL

export interface Model {
    isInProgress: boolean;
    undoStack: Command[];
    redoStack: Command[];
}

export type Command =
    | {
          type: "recipe_create";
          recipe: recipe.Recipe;
      }
    | {
          type: "recipe_import";
          recipes: recipe.Recipe[];
      };

export const init: Model = {
    isInProgress: false,
    undoStack: [],
    redoStack: [],
};

// SELECTORS

export function canUndo(model: Model): boolean {
    return model.undoStack.length > 0;
}

export function canRedo(model: Model): boolean {
    return model.redoStack.length > 0;
}

// UPDATE

export type Update = typeof update;

export const update = {
    executeRequest(model: Model): Model {
        return {
            ...model,
            isInProgress: true,
        };
    },
    executeFailure(model: Model): Model {
        return {
            ...model,
            isInProgress: false,
        };
    },
    executeSuccess(model: Model, command: Command): Model {
        return {
            ...model,
            isInProgress: false,
            undoStack: [command, ...model.undoStack],
            redoStack: [],
        };
    },
    undoRequest(model: Model): Model {
        return {
            ...model,
            isInProgress: true,
        };
    },
    undoFailure(model: Model): Model {
        return {
            ...model,
            isInProgress: false,
        };
    },
    undoSuccess(model: Model): Model {
        return {
            ...model,
            isInProgress: false,
            undoStack: model.undoStack.slice(1),
            redoStack: [model.undoStack[0], ...model.redoStack],
        };
    },
    redoRequest(model: Model): Model {
        return {
            ...model,
            isInProgress: true,
        };
    },
    redoFailure(model: Model): Model {
        return {
            ...model,
            isInProgress: false,
        };
    },
    redoSuccess(model: Model): Model {
        return {
            ...model,
            isInProgress: false,
            undoStack: [model.redoStack[0], ...model.undoStack],
            redoStack: model.redoStack.slice(1),
        };
    },
};

// COMMANDS

export type Commands = ReturnType<ReturnType<typeof createCommands>>;

export const createCommands = (db: sqlite.Database) => (
    model: Model,
    dispatch: Dispatch<Update>
) => {
    async function execute(command: Command) {
        if (model.isInProgress) {
            return;
        }
        dispatch.executeRequest();
        await executeCommand(db, command);
        dispatch.executeSuccess(command);
    }

    async function undo() {
        if (model.isInProgress || !canUndo(model)) {
            return;
        }
        dispatch.undoRequest();
        await undoCommand(db, model.undoStack[0]);
        dispatch.undoSuccess();
    }

    async function redo() {
        if (model.isInProgress || !canRedo(model)) {
            return;
        }
        dispatch.redoRequest();
        await redoCommand(db, model.redoStack[0]);
        dispatch.redoSuccess();
    }

    return {
        execute,
        undo,
        redo,
    };
};

async function executeCommand(db: sqlite.Database, command: Command) {
    switch (command.type) {
        case "recipe_create":
            return recipe.put(db, command.recipe);
        case "recipe_import":
            return recipe.putMultiple(db, command.recipes);
    }
}

async function undoCommand(db: sqlite.Database, command: Command) {
    switch (command.type) {
        case "recipe_create":
            return recipe.remove(db, command.recipe);
    }
}

async function redoCommand(db: sqlite.Database, command: Command) {
    switch (command.type) {
        case "recipe_create":
            return recipe.put(db, command.recipe);
    }
}

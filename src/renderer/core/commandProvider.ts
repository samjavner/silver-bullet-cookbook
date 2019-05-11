import * as sqlite from "sqlite";
import * as recipe from "../db/recipe";
import { SetState, useSelector } from "../store";

export type CommandProvider = ReturnType<typeof selector>;

export const useCommandProvider = (db: sqlite.Database): CommandProvider =>
    useSelector(selector, init, db);

// MODEL

interface State {
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
          type: "recipe_edit";
          recipe: recipe.Recipe;
      }
    | {
          type: "recipe_import";
          recipes: recipe.Recipe[];
      };

const init: State = {
    isInProgress: false,
    undoStack: [],
    redoStack: [],
};

// SELECTOR

const selector = (
    snapshot: State,
    setState: SetState<State>,
    db: sqlite.Database
) => {
    const isInProgress = snapshot.isInProgress;
    const canUndo = snapshot.undoStack.length > 0;
    const canRedo = snapshot.redoStack.length > 0;

    const execute = async (command: Command) => {
        if (isInProgress) {
            return;
        }

        setState(state => ({ ...state, isInProgress: true }));

        switch (command.type) {
            case "recipe_create":
            case "recipe_edit":
                await recipe.put(db, command.recipe);
                break;
            case "recipe_import":
                await recipe.putMultiple(db, command.recipes);
                break;
        }

        setState(state => ({
            isInProgress: false,
            undoStack: [command, ...state.undoStack],
            redoStack: [],
        }));
    };

    const undo = async () => {
        if (isInProgress || !canUndo) {
            return;
        }

        setState(state => ({ ...state, isInProgress: true }));

        const command = snapshot.undoStack[0];
        switch (command.type) {
            case "recipe_create":
                await recipe.remove(db, command.recipe);
                break;
        }

        setState(state => ({
            isInProgress: false,
            undoStack: state.undoStack.slice(1),
            redoStack: [state.undoStack[0], ...state.redoStack],
        }));
    };

    const redo = async () => {
        if (isInProgress || !canRedo) {
            return;
        }

        setState(state => ({ ...state, isInProgress: true }));

        const command = snapshot.redoStack[0];
        switch (command.type) {
            case "recipe_create":
                await recipe.put(db, command.recipe);
                break;
        }

        setState(state => ({
            isInProgress: false,
            undoStack: [state.redoStack[0], ...state.undoStack],
            redoStack: state.redoStack.slice(1),
        }));
    };

    return {
        isInProgress,
        canUndo,
        canRedo,
        execute,
        undo,
        redo,
    };
};

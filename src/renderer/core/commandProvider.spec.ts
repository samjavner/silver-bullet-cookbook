import * as sqlite from "sqlite";
import { getById, put } from "../db/recipe";
import { recipe1, recipe2, recipe3, recipe4, recipe5 } from "../db/recipe.mock";
import { MockDispatch, mockDispatch } from "../store/test";
import {
    canRedo,
    canUndo,
    Command,
    Commands,
    createCommands,
    Model,
    Update,
    update,
} from "./commandProvider";

describe("commandProvider", () => {
    let example: Model;

    const command5: Command = {
        type: "recipe_create",
        recipe: recipe5,
    };

    beforeEach(() => {
        example = {
            isInProgress: false,
            undoStack: [
                {
                    type: "recipe_create",
                    recipe: recipe1,
                },
                {
                    type: "recipe_create",
                    recipe: recipe2,
                },
            ],
            redoStack: [
                {
                    type: "recipe_create",
                    recipe: recipe3,
                },
                {
                    type: "recipe_create",
                    recipe: recipe4,
                },
            ],
        };
    });

    describe("selectors", () => {
        describe("canUndo", () => {
            it("is true if there is anything in undoStack", () => {
                const actual = canUndo(example);
                expect(actual).toBe(true);
            });

            it("is false if undoStack is empty", () => {
                const actual = canUndo({ ...example, undoStack: [] });
                expect(actual).toBe(false);
            });
        });

        describe("canRedo", () => {
            it("is true if there is anything in redoStack", () => {
                const actual = canRedo(example);
                expect(actual).toBe(true);
            });

            it("is false if redoStack is empty", () => {
                const actual = canRedo({ ...example, redoStack: [] });
                expect(actual).toBe(false);
            });
        });
    });

    describe("update", () => {
        describe("executeRequest", () => {
            it("should set isInProgress to true", () => {
                const actual = update.executeRequest(example);
                expect(actual.isInProgress).toEqual(true);
            });
        });

        describe("executeFailure", () => {
            let actual: Model;

            beforeAll(() => {
                actual = update.executeFailure(update.executeRequest(example));
            });

            it("should set isInProgress to false", () => {
                expect(actual.isInProgress).toEqual(false);
            });

            it("should preserve the undo stack", () => {
                expect(actual.undoStack).toEqual(example.undoStack);
            });

            it("should preserve the redo stack", () => {
                expect(actual.redoStack).toEqual(example.redoStack);
            });
        });

        describe("executeSuccess", () => {
            let actual: Model;

            beforeAll(() => {
                actual = update.executeSuccess(
                    update.executeRequest(example),
                    command5
                );
            });

            it("should set isInProgress to false", () => {
                expect(actual.isInProgress).toEqual(false);
            });

            it("should add the command to the top of the undo stack", () => {
                expect(actual.undoStack).toEqual([
                    command5,
                    ...example.undoStack,
                ]);
            });

            it("should clear the redo stack", () => {
                expect(actual.redoStack).toEqual([]);
            });
        });

        describe("undoRequest", () => {
            it("should set isInProgress to true", () => {
                const actual = update.undoRequest(example);
                expect(actual.isInProgress).toEqual(true);
            });
        });

        describe("undoFailure", () => {
            let actual: Model;

            beforeAll(() => {
                actual = update.undoFailure(update.executeRequest(example));
            });

            it("should set isInProgress to false", () => {
                expect(actual.isInProgress).toEqual(false);
            });

            it("should preserve the undo stack", () => {
                expect(actual.undoStack).toEqual(example.undoStack);
            });

            it("should preserve the redo stack", () => {
                expect(actual.redoStack).toEqual(example.redoStack);
            });
        });

        describe("undoSuccess", () => {
            let actual: Model;

            beforeAll(() => {
                actual = update.undoSuccess(update.executeRequest(example));
            });

            it("should set isInProgress to false", () => {
                expect(actual.isInProgress).toEqual(false);
            });

            it("should remove the command from the top of the undo stack", () => {
                expect(actual.undoStack).toEqual(example.undoStack.slice(1));
            });

            it("should add the command from the top of the undo stack to the top of the redo stack", () => {
                expect(actual.redoStack).toEqual([
                    example.undoStack[0],
                    ...example.redoStack,
                ]);
            });
        });

        describe("redoRequest", () => {
            it("should set isInProgress to true", () => {
                const actual = update.redoRequest(example);
                expect(actual.isInProgress).toEqual(true);
            });
        });

        describe("redoFailure", () => {
            let actual: Model;

            beforeAll(() => {
                actual = update.redoFailure(update.executeRequest(example));
            });

            it("should set isInProgress to false", () => {
                expect(actual.isInProgress).toEqual(false);
            });

            it("should preserve the redo stack", () => {
                expect(actual.redoStack).toEqual(example.redoStack);
            });

            it("should preserve the redo stack", () => {
                expect(actual.redoStack).toEqual(example.redoStack);
            });
        });

        describe("redoSuccess", () => {
            let actual: Model;

            beforeAll(() => {
                actual = update.redoSuccess(update.executeRequest(example));
            });

            it("should set isInProgress to false", () => {
                expect(actual.isInProgress).toEqual(false);
            });

            it("should remove the command from the top of the redo stack", () => {
                expect(actual.redoStack).toEqual(example.redoStack.slice(1));
            });

            it("should add the command from the top of the redo stack to the top of the undo stack", () => {
                expect(actual.undoStack).toEqual([
                    example.redoStack[0],
                    ...example.undoStack,
                ]);
            });
        });
    });

    describe("commands", () => {
        let mock: MockDispatch<Model, Update>;
        let db: sqlite.Database;
        let commands: Commands;

        beforeEach(async () => {
            mock = mockDispatch(example, update);
            db = await sqlite.open(":memory:");
            await db.migrate({ migrationsPath: "static/migrations" });
            commands = createCommands(db)(example, mock.dispatch);
            mock.reset();
        });

        afterEach(async () => {
            db.close();
        });

        describe("execute", () => {
            it("should not do anything if isInProgress", async () => {
                mock.reset(update.executeRequest(example));
                commands = createCommands(db)(mock.state, mock.dispatch);
                await commands.execute(command5);
                expect(mock.history.messages).toEqual([]);
            });

            it("should dispatch executeRequest, execute the command, and then dispatch executeSuccess", async () => {
                const promise = commands.execute(command5);
                expect(mock.history.messages).toEqual([
                    ["executeRequest", undefined],
                ]);
                await promise;
                expect(mock.history.messages).toEqual([
                    ["executeRequest", undefined],
                    ["executeSuccess", command5],
                ]);
                const recipe = await getById(db, command5.recipe.id);
                expect(recipe).toEqual(command5.recipe);
            });
        });

        describe("undo", () => {
            it("should not do anything if isInProgress", async () => {
                mock.reset(update.undoRequest(example));
                commands = createCommands(db)(mock.state, mock.dispatch);
                await commands.undo();
                expect(mock.history.messages).toEqual([]);
            });

            it("should not do anything if not canUndo", async () => {
                mock.reset({ ...example, undoStack: [] });
                commands = createCommands(db)(mock.state, mock.dispatch);
                await commands.undo();
                expect(mock.history.messages).toEqual([]);
            });

            it("should dispatch undoRequest, undo the command, and then dispatch undoSuccess", async () => {
                await put(db, (example.undoStack[0] as any).recipe);
                const promise = commands.undo();
                expect(mock.history.messages).toEqual([
                    ["undoRequest", undefined],
                ]);
                await promise;
                expect(mock.history.messages).toEqual([
                    ["undoRequest", undefined],
                    ["undoSuccess", undefined],
                ]);
                const recipe = await getById(
                    db,
                    (example.undoStack[0] as any).recipe.id
                );
                expect(recipe).toBeUndefined();
            });
        });

        describe("redo", () => {
            it("should not do anything if isInProgress", async () => {
                mock.reset(update.redoRequest(example));
                commands = createCommands(db)(mock.state, mock.dispatch);
                await commands.redo();
                expect(mock.history.messages).toEqual([]);
            });

            it("should not do anything if not canRedo", async () => {
                mock.reset({ ...example, redoStack: [] });
                commands = createCommands(db)(mock.state, mock.dispatch);
                await commands.redo();
                expect(mock.history.messages).toEqual([]);
            });

            it("should dispatch redoRequest, redo the command, and then dispatch redoSuccess", async () => {
                const promise = commands.redo();
                expect(mock.history.messages).toEqual([
                    ["redoRequest", undefined],
                ]);
                await promise;
                expect(mock.history.messages).toEqual([
                    ["redoRequest", undefined],
                    ["redoSuccess", undefined],
                ]);
                const recipe = await getById(
                    db,
                    (example.redoStack[0] as any).recipe.id
                );
                expect(recipe).toEqual((example.redoStack[0] as any).recipe);
            });
        });
    });

    describe("executeCommand", () => {
        // TODO
    });

    describe("undoCommand", () => {
        // TODO
    });

    describe("redoCommand", () => {
        // TODO
    });
});

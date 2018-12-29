import * as sqlite from "sqlite";
import { getById, put } from "../db/recipe";
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
        recipe: {
            id: "1a739dae-668e-49f3-b739-c85b39259ab2",
            name: "Test Recipe 5",
            ingredients: "Ingredient 5a\nIngredient 5b",
            directions: "Direction 5a\nDirection 5b",
        },
    };

    beforeEach(() => {
        example = {
            isInProgress: false,
            undoStack: [
                {
                    type: "recipe_create",
                    recipe: {
                        id: "2218d7ea-5bab-4323-a29e-710ff02fa620",
                        name: "Test Recipe 1",
                        ingredients: "Ingredient 1a\nIngredient 1b",
                        directions: "Direction 1a\nDirection 1b",
                    },
                },
                {
                    type: "recipe_create",
                    recipe: {
                        id: "a122b9d7-6263-4996-a383-9172e0e52011",
                        name: "Test Recipe 2",
                        ingredients: "Ingredient 2a\nIngredient 2b",
                        directions: "Direction 2a\nDirection 2b",
                    },
                },
            ],
            redoStack: [
                {
                    type: "recipe_create",
                    recipe: {
                        id: "1d58b6c8-c606-4485-920f-db5afa2c660c",
                        name: "Test Recipe 3",
                        ingredients: "Ingredient 3a\nIngredient 3b",
                        directions: "Direction 3a\nDirection 3b",
                    },
                },
                {
                    type: "recipe_create",
                    recipe: {
                        id: "7906f799-a6fd-4e0a-9a72-caf67fcffdd3",
                        name: "Test Recipe 4",
                        ingredients: "Ingredient 4a\nIngredient 4b",
                        directions: "Direction 4a\nDirection 4b",
                    },
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

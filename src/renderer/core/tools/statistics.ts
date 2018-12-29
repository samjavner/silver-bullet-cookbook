import { Dispatch, Store, UseStore } from "../../store";

export type Statistics = Store<Model, Update, Commands>;

export function useStatistics(
    useStore: UseStore<Model, Update, Commands>
): Statistics {
    return useStore({
        init,
        update,
        createCommands,
    });
}

// MODEL

export interface Model {
    dieFace: number;
}

export const init: Model = {
    dieFace: 1,
};

// UPDATE

type Update = typeof update;

export const update = {
    newFace(model: Model, dieFace: number): Model {
        return {
            ...model,
            dieFace,
        };
    },
};

// COMMANDS

type Commands = ReturnType<typeof createCommands>;

export const createCommands = (model: Model, dispatch: Dispatch<Update>) => {
    async function roll() {
        const dieFace = Math.floor(Math.random() * 6 + 1);
        dispatch.newFace(dieFace);
    }
    return {
        roll,
    };
};

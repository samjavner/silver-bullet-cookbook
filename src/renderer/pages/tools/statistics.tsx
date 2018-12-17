import * as React from "react";
import * as util from "../util";

// MODEL

export interface Model {
    dieFace: number;
}

export const init: Model = {
    dieFace: 1,
};

// UPDATE

export const update = {
    roll(model: Model): Model {
        return model;
    },
    newFace(model: Model, dieFace: number): Model {
        return {
            ...model,
            dieFace,
        };
    },
};

// COMMANDS

export const commands = {
    roll(snapshot: ViewModel) {
        const dieFace = Math.floor(Math.random() * 6 + 1);
        snapshot.newFace(dieFace);
    },
};

// VIEW

export type ViewModel = util.ViewModel<Model, typeof update>;

export const Page: React.FunctionComponent<ViewModel> = vm => (
    <div>
        <button className="button" onClick={vm.roll}>
            {vm.dieFace}
        </button>
    </div>
);

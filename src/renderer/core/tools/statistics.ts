import { SetState, useSelector } from "../../store";

export type Statistics = ReturnType<typeof selector>;

export const useStatistics = (): Statistics => useSelector(selector, init);

// MODEL

interface State {
    dieFace: number;
}

const init: State = {
    dieFace: 1,
};

// SELECTOR

const selector = (snapshot: State, setState: SetState<State>) => {
    const roll = () =>
        setState(state => ({
            ...state,
            dieFace: Math.floor(Math.random() * 6 + 1),
        }));

    return {
        ...snapshot,
        roll,
    };
};

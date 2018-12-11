import * as actions from "./actions";
import { State } from "./model";
import { reducer } from "./reducer";

const initialState: State = {
    selectedIndex: 0,
};

describe("reducer", () => {
    it("should return the initial state", () => {
        const actual = reducer(undefined, {} as any);
        expect(actual).toEqual(initialState);
    });

    it("should set selectedIndex", () => {
        const action = actions.setSelectedIndex(100);
        const actual = reducer(initialState, action);
        const expected: State = {
            ...initialState,
            selectedIndex: 100,
        };
        expect(actual).toEqual(expected);
    });
});

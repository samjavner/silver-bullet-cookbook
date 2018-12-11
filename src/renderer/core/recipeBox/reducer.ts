import { Reducer } from "redux";
import { ActionType, getType } from "typesafe-actions";
import * as actions from "./actions";
import { State } from "./model";

const init: State = {
    selectedIndex: 0,
};

export type Action = ActionType<typeof actions>;

export const reducer: Reducer<State, Action> = (state = init, action) => {
    switch (action.type) {
        case getType(actions.setSelectedIndex):
            return {
                ...state,
                selectedIndex: action.payload,
            };
    }

    return state;
};

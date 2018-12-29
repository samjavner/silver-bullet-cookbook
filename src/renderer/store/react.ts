import * as React from "react";
import { Commands, Dispatch, Store, Update, UseStoreOptions } from "./";

export interface Msg<M extends object, U extends Update<M>> {
    type: keyof U;
    payload?: any;
}

export function useLocalStore(log: (msg: any) => void = () => ({})) {
    return function actual<
        M extends object,
        U extends Update<M>,
        C extends Commands = {}
    >({
        init,
        update,
        createCommands,
        memo = [],
    }: UseStoreOptions<M, U, C>): Store<M, U, C> {
        const [model, reducerDispatch] = React.useReducer(
            (state: M, action: Msg<M, U>) =>
                update[action.type](state, action.payload),
            init
        );

        const vm = React.useMemo(
            () => {
                const dispatch: Dispatch<U> = {} as any;
                Object.keys(update).forEach(type => {
                    (dispatch as any)[type] = (payload: any) => {
                        const msg =
                            update[type].length === 1
                                ? { type }
                                : { type, payload };
                        log(msg);
                        reducerDispatch(msg);
                    };
                });
                const commands: C = createCommands
                    ? createCommands(model, dispatch)
                    : (({} as any) as C);
                return {
                    ...model,
                    ...dispatch,
                    ...commands,
                };
            },
            [model, update, ...memo]
        );

        return vm;
    };
}

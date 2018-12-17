import * as React from "react";

export interface Update<M> {
    [msgType: string]: (model: M, payload?: any) => M;
}

export type ViewModel<M, U extends Update<M>> = M &
    {
        [T in keyof U]: U[T] extends (model: M) => M
            ? () => void
            : (U[T] extends (model: M, payload: infer P) => M
                  ? (payload: P) => void
                  : never)
    };

export type Commands<M, U extends Update<M>> = {
    [T in keyof U]?: U[T] extends (model: M) => M
        ? (vm: ViewModel<M, U>) => void
        : (U[T] extends (model: M, payload: infer P) => M
              ? (vm: ViewModel<M, U>, payload: P) => void
              : never)
};

export interface Msg<M, U extends Update<M>> {
    type: keyof U;
    payload?: any;
}

export function useViewModel<
    M,
    U extends Update<M>,
    C extends Commands<M, U> = {}
>({
    init,
    update,
    commands,
    log = () => ({}),
}: {
    init: M;
    update: U;
    commands?: C;
    log?: (msg: Msg<M, U>) => void;
}): ViewModel<M, U> {
    const [model, reducerDispatch] = React.useReducer(
        (state: M, action: Msg<M, U>) =>
            update[action.type](state, action.payload),
        init
    );

    const vm = React.useMemo(
        () => {
            const viewModel = {
                ...model,
            } as any;

            Object.keys(update).forEach(type => {
                viewModel[type] = (payload: any) => {
                    const msg =
                        update[type].length === 1
                            ? { type }
                            : { type, payload };
                    log(msg);
                    reducerDispatch(msg);
                    commands &&
                        commands[msg.type] &&
                        (commands[msg.type] as any)(vm, msg.payload);
                };
            });

            return viewModel as ViewModel<M, U>;
        },
        [model, update, commands]
    );

    return vm;
}

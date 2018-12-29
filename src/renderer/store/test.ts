import { Commands, Dispatch, Store, Update, UseStoreOptions } from "./";

export function useTestStore<
    M extends object,
    U extends Update<M>,
    C extends Commands = {}
>({ init, update, createCommands }: UseStoreOptions<M, U, C>): Store<M, U, C> {
    let state = init;

    const dispatch: Dispatch<U> = {} as any;
    Object.keys(update).forEach(type => {
        (dispatch as any)[type] = (payload: any) => {
            state = update[type](state, payload);
        };
    });

    const commands: C = createCommands
        ? createCommands(state, dispatch)
        : (({} as any) as C);

    return {
        ...state,
        ...dispatch,
        ...commands,
    };
}

export interface MockDispatch<M extends object, U extends Update<M>> {
    dispatch: Dispatch<U>;
    state: M;
    history: {
        messages: Array<[keyof U, any]>;
        state: M[];
    };
    reset(state?: M): void;
}

export function mockDispatch<M extends object, U extends Update<M>>(
    init: M,
    update: U
): MockDispatch<M, U> {
    const mock: MockDispatch<M, U> = {
        dispatch: ({} as any) as Dispatch<U>,
        state: init,
        history: {
            messages: [] as Array<[keyof U, any]>,
            state: [] as M[],
        },
        reset(state?: M) {
            this.state = state || init;
            this.history = {
                messages: [],
                state: [],
            };
        },
    };

    Object.keys(update).forEach(type => {
        (mock.dispatch as any)[type] = (payload: any) => {
            mock.history.messages.push([type, payload]);
            const state = update[type](mock.state, payload);
            mock.history.state.push(state);
            mock.state = state;
        };
    });

    return mock;
}

export interface Update<M extends object> {
    [msgType: string]: (model: M, payload?: any) => M;
}

export type Dispatch<U> = {
    [T in keyof U]: U[T] extends (model: infer M) => infer M
        ? () => void
        : (U[T] extends (model: infer M, payload: infer P) => infer M
              ? (payload: P) => void
              : never)
};

export interface Commands {
    [msgType: string]: (payload?: any) => Promise<any>;
}

export type Store<
    M extends object = {},
    U extends Update<M> = {},
    C extends Commands = {}
> = M & Dispatch<U> & C;

export interface UseStoreOptions<
    M extends object,
    U extends Update<M>,
    C extends Commands = {}
> {
    init: M;
    update: U;
    createCommands?: (m: M, d: Dispatch<U>) => C;
    memo?: ReadonlyArray<any>;
}

export type UseStore<
    M extends object = {},
    U extends Update<M> = {},
    C extends Commands = {}
> = (options: UseStoreOptions<M, U, C>) => Store<M, U, C>;

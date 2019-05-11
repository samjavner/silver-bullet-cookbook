import { useMemo, useState } from "react";

export type SetState<S> = (value: (prevState: S) => S) => void;

export type UseState<S> = (initialState: S) => [S, SetState<S>];

export const useSelector = <S, V, D extends any[]>(
    selector: (snapshot: S, setState: SetState<S>, ...dependencies: D) => V,
    init: S,
    ...dependencies: D
): V => {
    const [snapshot, setState] = useState(init);
    return useMemo(() => selector(snapshot, setState, ...dependencies), [
        snapshot,
        ...dependencies,
    ]);
};

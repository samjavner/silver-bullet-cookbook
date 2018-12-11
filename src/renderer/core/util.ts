import { GlobalState } from "./model";

export function globalizeSelectors<
    S,
    T extends { [P in keyof T]: (state: S) => any }
>(
    moduleName: string,
    selectors: T
): { [P in keyof T]: (state: GlobalState) => ReturnType<T[P]> } {
    const globalizedSelectors: any = {};
    Object.keys(selectors).forEach(name => {
        globalizedSelectors[name] = (state: any) =>
            (selectors as any)[name](state[moduleName]);
    });
    return globalizedSelectors;
}

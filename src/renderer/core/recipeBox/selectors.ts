import { globalizeSelectors } from "../util";
import { moduleName, State } from "./model";

export const getSelectedIndex = (state: State) => state.selectedIndex;

const selectors = {
    getSelectedIndex,
};

export default globalizeSelectors<State, typeof selectors>(
    moduleName,
    selectors
);

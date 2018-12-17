import * as React from "react";
import * as navigation from "../pages/navigation";
import * as recipeBox from "../pages/recipes/recipeBox";
import * as statistics from "../pages/tools/statistics";
import { useViewModel } from "../pages/util";

export const App: React.FunctionComponent<{
    Component: React.FunctionComponent<navigation.Props>;
}> = ({ Component }) => {
    const log = (vm: string) => (msg: any) => {
        // tslint:disable-next-line:no-console
        console.log(
            `${vm}.${msg.type}(${
                msg.payload === undefined ? "" : JSON.stringify(msg.payload)
            })`
        );
    };

    const vms = {
        vm: useViewModel({
            init: navigation.init,
            update: navigation.update,
            log: log("navigation"),
        }),

        recipeBoxVm: useViewModel({
            init: recipeBox.init,
            update: recipeBox.update,
            log: log("recipeBox"),
        }),

        statisticsVm: useViewModel({
            init: statistics.init,
            update: statistics.update,
            commands: statistics.commands,
            log: log("statistics"),
        }),
    };

    return <Component {...vms} />;
};

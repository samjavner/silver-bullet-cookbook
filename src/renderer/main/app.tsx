import * as React from "react";
import * as sqlite from "sqlite";
import { useCommandProvider } from "../core/commandProvider";
import { useNavigation } from "../core/navigation";
import { useRecipeBox } from "../core/recipes/recipeBox";
import { useImport } from "../core/tools/import";
import { useStatistics } from "../core/tools/statistics";
import { useLocalStore } from "../store/react";
import { LayoutProps } from "../views/Layout";

export const App: React.FunctionComponent<{
    Component: React.FunctionComponent<LayoutProps>;
    db: sqlite.Database;
}> = ({ Component, db }) => {
    const log = (vm: string) => (msg: any) => {
        // tslint:disable-next-line:no-console
        console.log(
            `${vm}.${msg.type}(${
                msg.payload === undefined ? "" : JSON.stringify(msg.payload)
            })`
        );
    };

    const commandProvider = useCommandProvider(
        useLocalStore(log("command")),
        db
    );
    const navigation = useNavigation(useLocalStore(log("navigation")));
    const recipeBox = useRecipeBox(
        useLocalStore(log("recipeBox")),
        commandProvider,
        db
    );
    const toolsImport = useImport(useLocalStore(log("import")), recipeBox);
    const statistics = useStatistics(useLocalStore(log("statistics")));

    return (
        <Component
            navigation={navigation}
            recipeBox={recipeBox}
            import={toolsImport}
            statistics={statistics}
            commandProvider={commandProvider}
        />
    );
};

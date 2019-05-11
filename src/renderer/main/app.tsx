import * as React from "react";
import * as sqlite from "sqlite";
import { useCommandProvider } from "../core/commandProvider";
import { useNavigation } from "../core/navigation";
import { useRecipeBox } from "../core/recipes/recipeBox";
import { useImport } from "../core/tools/import";
import { useStatistics } from "../core/tools/statistics";
import { LayoutProps } from "../views/Layout";

export const App: React.FunctionComponent<{
    Component: React.FunctionComponent<LayoutProps>;
    db: sqlite.Database;
}> = ({ Component, db }) => {
    const commandProvider = useCommandProvider(db);
    const navigation = useNavigation();
    const recipeBox = useRecipeBox(commandProvider, db);
    const toolsImport = useImport(recipeBox);
    const statistics = useStatistics();

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

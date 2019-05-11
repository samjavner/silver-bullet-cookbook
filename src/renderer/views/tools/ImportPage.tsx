import * as React from "react";
import { Import } from "../../core/tools/import";

export const ImportPage: React.FunctionComponent<Import> = vm => (
    <div>
        <button className="button" onClick={vm.importRecipes}>
            Import
        </button>
    </div>
);

export default ImportPage;

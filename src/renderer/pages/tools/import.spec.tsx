import * as React from "react";
import * as renderer from "react-test-renderer";
import * as toolsImport from "./import";

describe("import", () => {
    describe("Page", () => {
        it("renders a button with the text 'Import'", () => {
            const component = renderer.create(<toolsImport.Page />);
            const tree = component.toJSON();
            expect(tree).toMatchSnapshot();
        });
    });
});

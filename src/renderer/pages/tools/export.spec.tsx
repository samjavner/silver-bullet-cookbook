import * as React from "react";
import * as renderer from "react-test-renderer";
import * as toolsExport from "./export";

describe("export", () => {
    describe("Page", () => {
        it("renders the text 'Export'", () => {
            const component = renderer.create(<toolsExport.Page />);
            const tree = component.toJSON();
            expect(tree).toMatchSnapshot();
        });
    });
});

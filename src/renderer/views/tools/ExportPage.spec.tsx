import * as React from "react";
import * as renderer from "react-test-renderer";
import { ExportPage } from "./ExportPage";

describe("ExportPage", () => {
    it("renders the text 'Export'", () => {
        const component = renderer.create(<ExportPage />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

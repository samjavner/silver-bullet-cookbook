import * as React from "react";
import * as renderer from "react-test-renderer";
import { ImportPage } from "./ImportPage";

describe("ImportPage", () => {
    it("renders the a button with the text 'Import'", () => {
        const component = renderer.create(<ImportPage />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

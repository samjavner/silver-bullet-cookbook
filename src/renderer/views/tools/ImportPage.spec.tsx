import * as React from "react";
import * as renderer from "react-test-renderer";
import { ImportPage } from "./ImportPage";

describe("ImportPage", () => {
    it("renders a button with the text 'Import'", () => {
        const component = renderer.create(
            <ImportPage
                isImporting={false}
                importRequest={() => ({})}
                importSuccess={() => ({})}
                import={() => Promise.resolve()}
            />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

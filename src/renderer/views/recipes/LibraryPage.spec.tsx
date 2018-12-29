import * as React from "react";
import * as renderer from "react-test-renderer";
import { LibraryPage } from "./LibraryPage";

describe("LibraryPage", () => {
    it("renders the text 'Library'", () => {
        const component = renderer.create(<LibraryPage />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

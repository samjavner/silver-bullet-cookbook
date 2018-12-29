import * as React from "react";
import * as renderer from "react-test-renderer";
import { TagsPage } from "./TagsPage";

describe("TagsPage", () => {
    it("renders the text 'Tags'", () => {
        const component = renderer.create(<TagsPage />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

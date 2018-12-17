import * as React from "react";
import * as renderer from "react-test-renderer";
import * as tags from "./tags";

describe("tags", () => {
    describe("Page", () => {
        it("renders the text 'Tags'", () => {
            const component = renderer.create(<tags.Page />);
            const tree = component.toJSON();
            expect(tree).toMatchSnapshot();
        });
    });
});

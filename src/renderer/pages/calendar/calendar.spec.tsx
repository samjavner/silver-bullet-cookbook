import * as React from "react";
import * as renderer from "react-test-renderer";
import * as calendar from "./calendar";

describe("calendar", () => {
    describe("Page", () => {
        it("renders the text 'Calendar'", () => {
            const component = renderer.create(<calendar.Page />);
            const tree = component.toJSON();
            expect(tree).toMatchSnapshot();
        });
    });
});

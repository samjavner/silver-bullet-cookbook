import * as React from "react";
import * as renderer from "react-test-renderer";
import * as timer from "./timer";

describe("timer", () => {
    describe("Page", () => {
        it("renders the text 'Timer'", () => {
            const component = renderer.create(<timer.Page />);
            const tree = component.toJSON();
            expect(tree).toMatchSnapshot();
        });
    });
});

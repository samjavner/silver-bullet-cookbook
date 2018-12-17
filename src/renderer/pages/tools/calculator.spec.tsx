import * as React from "react";
import * as renderer from "react-test-renderer";
import * as calculator from "./calculator";

describe("calculator", () => {
    describe("Page", () => {
        it("renders the text 'Calculator'", () => {
            const component = renderer.create(<calculator.Page />);
            const tree = component.toJSON();
            expect(tree).toMatchSnapshot();
        });
    });
});

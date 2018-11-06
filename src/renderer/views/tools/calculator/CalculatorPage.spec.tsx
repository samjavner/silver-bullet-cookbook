import * as React from "react";
import * as renderer from "react-test-renderer";
import { CalculatorPage } from "./CalculatorPage";

describe("CalculatorPage", () => {
    it("renders the text 'Calculator'", () => {
        const component = renderer.create(<CalculatorPage />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

import * as React from "react";
import * as renderer from "react-test-renderer";
import { HomePage } from "./HomePage";

describe("HomePage", () => {
    it("renders the text 'Home'", () => {
        const component = renderer.create(<HomePage />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

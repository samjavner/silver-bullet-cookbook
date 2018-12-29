import * as React from "react";
import * as renderer from "react-test-renderer";
import { AboutPage } from "./AboutPage";

describe("AboutPage", () => {
    it("renders the text 'About'", () => {
        const component = renderer.create(<AboutPage />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

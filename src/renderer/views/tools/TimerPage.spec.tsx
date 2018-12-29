import * as React from "react";
import * as renderer from "react-test-renderer";
import { TimerPage } from "./TimerPage";

describe("TimerPage", () => {
    it("renders the text 'Timer'", () => {
        const component = renderer.create(<TimerPage />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

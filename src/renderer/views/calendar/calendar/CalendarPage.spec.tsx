import * as React from "react";
import * as renderer from "react-test-renderer";
import { CalendarPage } from "./CalendarPage";

describe("CalendarPage", () => {
    it("renders the text 'Calendar'", () => {
        const component = renderer.create(<CalendarPage />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

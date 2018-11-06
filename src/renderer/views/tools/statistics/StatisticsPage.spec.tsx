import * as React from "react";
import * as renderer from "react-test-renderer";
import { StatisticsPage } from "./StatisticsPage";

describe("StatisticsPage", () => {
    it("renders the text 'Statistics'", () => {
        const component = renderer.create(<StatisticsPage />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

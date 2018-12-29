import * as React from "react";
import * as renderer from "react-test-renderer";
import { StatisticsPage } from "./StatisticsPage";

describe("StatisticsPage", () => {
    it("renders a button with the current dieFace", () => {
        const component = renderer.create(
            <StatisticsPage
                dieFace={5}
                newFace={() => ({})}
                roll={() => Promise.resolve()}
            />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

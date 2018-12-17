import * as React from "react";
import * as renderer from "react-test-renderer";
import * as statistics from "./statistics";

describe("statistics", () => {
    describe("Page", () => {
        it("renders a button with the current dieFace", () => {
            const component = renderer.create(
                <statistics.Page
                    dieFace={5}
                    newFace={() => ({})}
                    roll={() => ({})}
                />
            );
            const tree = component.toJSON();
            expect(tree).toMatchSnapshot();
        });
    });
});

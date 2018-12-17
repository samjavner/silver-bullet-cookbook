import * as React from "react";
import * as renderer from "react-test-renderer";
import * as recipeBox from "./recipeBox";

describe("recipeBox", () => {
    describe("update", () => {
        it("should update selectedIndex", () => {
            const actual = recipeBox.update.setSelectedIndex(
                recipeBox.init,
                100
            );
            const expected: recipeBox.Model = {
                ...recipeBox.init,
                selectedIndex: 100,
            };
            expect(actual).toEqual(expected);
        });
    });

    describe("Page", () => {
        it("renders the master/detail view", () => {
            const component = renderer.create(
                <recipeBox.Page
                    vm={{
                        selectedIndex: 10,
                        setSelectedIndex: () => ({} as any),
                    }}
                    statisticsVm={{
                        dieFace: 1,
                        newFace: () => ({} as any),
                        roll: () => ({} as any),
                    }}
                />
            );
            const tree = component.toJSON();
            expect(tree).toMatchSnapshot();
        });
    });
});

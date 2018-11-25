import * as React from "react";
import * as renderer from "react-test-renderer";
import { RecipeBoxPage } from "./RecipeBoxPage";

describe("RecipeBoxPage", () => {
    it("renders the master/detail view", () => {
        const component = renderer.create(
            <RecipeBoxPage
                selectedIndex={10}
                setSelectedIndex={() => ({} as any)}
            />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

import * as React from "react";
import * as renderer from "react-test-renderer";
import { RecipeBoxPage } from "./RecipeBoxPage";

describe("RecipeBoxPage", () => {
    it("renders the text 'Recipe Box'", () => {
        const component = renderer.create(<RecipeBoxPage />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

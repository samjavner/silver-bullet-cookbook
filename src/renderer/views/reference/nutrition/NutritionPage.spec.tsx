import * as React from "react";
import * as renderer from "react-test-renderer";
import { NutritionPage } from "./NutritionPage";

describe("NutritionPage", () => {
    it("renders the text 'Nutrition'", () => {
        const component = renderer.create(<NutritionPage />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

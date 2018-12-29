import * as React from "react";
import * as renderer from "react-test-renderer";
import * as recipeBox from "../../core/recipes/recipeBox";
import { RecipeBoxPage } from "./RecipeBoxPage";

describe("RecipeBoxPage", () => {
    it("renders the master/detail view", () => {
        const component = renderer.create(
            <RecipeBoxPage
                recipeBox={{
                    ...recipeBox.init,
                    selectedIndex: 10,
                    refreshSuccess: () => ({}),
                    setSelectedIndex: () => ({}),
                    openAddRecipe: () => ({}),
                    closeAddRecipe: () => ({}),
                    openEditRecipe: () => ({}),
                    closeEditRecipe: () => ({}),
                    refresh: () => Promise.resolve(),
                    saveAddRecipe: () => Promise.resolve(),
                    addMultiple: () => Promise.resolve(),
                }}
            />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

import * as React from "react";
import * as renderer from "react-test-renderer";
import { RecipeBoxPage } from "./RecipeBoxPage";

describe("RecipeBoxPage", () => {
    it("renders the master/detail view", () => {
        const component = renderer.create(
            <RecipeBoxPage
                recipeBox={{
                    recipes: [],
                    selectedIndex: 10,
                    isAddRecipeActive: false,
                    isEditRecipeActive: false,
                    setSelectedIndex: () => ({}),
                    openAddRecipe: () => ({}),
                    closeAddRecipe: () => ({}),
                    openEditRecipe: () => ({}),
                    closeEditRecipe: () => ({}),
                    saveAddRecipe: () => Promise.resolve(),
                    saveEditRecipe: () => Promise.resolve(),
                    addMultiple: () => Promise.resolve(),
                }}
            />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

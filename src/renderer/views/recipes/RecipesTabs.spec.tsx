import * as React from "react";
import * as renderer from "react-test-renderer";
import { RecipesTabs } from "./RecipesTabs";

describe("RecipesTabs", () => {
    const onLibraryClick = () => ({} as any);
    const onRecipeBoxClick = () => ({} as any);
    const onFavoritesClick = () => ({} as any);
    const onTagsClick = () => ({} as any);
    const onSearchClick = () => ({} as any);

    it("should render with the 'library' tab active when the 'library' page is active", () => {
        const component = renderer.create(
            <RecipesTabs
                activePage="library"
                onLibraryClick={onLibraryClick}
                onRecipeBoxClick={onRecipeBoxClick}
                onFavoritesClick={onFavoritesClick}
                onTagsClick={onTagsClick}
                onSearchClick={onSearchClick}
            />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("should render with the 'recipe_box' tab active when the 'recipe_box' page is active", () => {
        const component = renderer.create(
            <RecipesTabs
                activePage="recipe_box"
                onLibraryClick={onLibraryClick}
                onRecipeBoxClick={onRecipeBoxClick}
                onFavoritesClick={onFavoritesClick}
                onTagsClick={onTagsClick}
                onSearchClick={onSearchClick}
            />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("should render with the 'favorites' tab active when the 'favorites' page is active", () => {
        const component = renderer.create(
            <RecipesTabs
                activePage="favorites"
                onLibraryClick={onLibraryClick}
                onRecipeBoxClick={onRecipeBoxClick}
                onFavoritesClick={onFavoritesClick}
                onTagsClick={onTagsClick}
                onSearchClick={onSearchClick}
            />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("should render with the 'tags' tab active when the 'tags' page is active", () => {
        const component = renderer.create(
            <RecipesTabs
                activePage="tags"
                onLibraryClick={onLibraryClick}
                onRecipeBoxClick={onRecipeBoxClick}
                onFavoritesClick={onFavoritesClick}
                onTagsClick={onTagsClick}
                onSearchClick={onSearchClick}
            />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("should render with the 'search' tab active when the 'search' page is active", () => {
        const component = renderer.create(
            <RecipesTabs
                activePage="search"
                onLibraryClick={onLibraryClick}
                onRecipeBoxClick={onRecipeBoxClick}
                onFavoritesClick={onFavoritesClick}
                onTagsClick={onTagsClick}
                onSearchClick={onSearchClick}
            />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("should handle click on 'library' tab", () => {
        const component = renderer.create(
            <RecipesTabs
                activePage="library"
                onLibraryClick={onLibraryClick}
                onRecipeBoxClick={onRecipeBoxClick}
                onFavoritesClick={onFavoritesClick}
                onTagsClick={onTagsClick}
                onSearchClick={onSearchClick}
            />
        );
        const button = component.root.find(
            node =>
                node.props.className &&
                node.props.className.indexOf("pz-navtabs-button--active") !== -1
        );
        expect(button.props.onClick).toBe(onLibraryClick);
    });

    it("should handle click on 'recipe_box' tab", () => {
        const component = renderer.create(
            <RecipesTabs
                activePage="recipe_box"
                onLibraryClick={onLibraryClick}
                onRecipeBoxClick={onRecipeBoxClick}
                onFavoritesClick={onFavoritesClick}
                onTagsClick={onTagsClick}
                onSearchClick={onSearchClick}
            />
        );
        const button = component.root.find(
            node =>
                node.props.className &&
                node.props.className.indexOf("pz-navtabs-button--active") !== -1
        );
        expect(button.props.onClick).toBe(onRecipeBoxClick);
    });

    it("should handle click on 'favorites' tab", () => {
        const component = renderer.create(
            <RecipesTabs
                activePage="favorites"
                onLibraryClick={onLibraryClick}
                onRecipeBoxClick={onRecipeBoxClick}
                onFavoritesClick={onFavoritesClick}
                onTagsClick={onTagsClick}
                onSearchClick={onSearchClick}
            />
        );
        const button = component.root.find(
            node =>
                node.props.className &&
                node.props.className.indexOf("pz-navtabs-button--active") !== -1
        );
        expect(button.props.onClick).toBe(onFavoritesClick);
    });

    it("should handle click on 'tags' tab", () => {
        const component = renderer.create(
            <RecipesTabs
                activePage="tags"
                onLibraryClick={onLibraryClick}
                onRecipeBoxClick={onRecipeBoxClick}
                onFavoritesClick={onFavoritesClick}
                onTagsClick={onTagsClick}
                onSearchClick={onSearchClick}
            />
        );
        const button = component.root.find(
            node =>
                node.props.className &&
                node.props.className.indexOf("pz-navtabs-button--active") !== -1
        );
        expect(button.props.onClick).toBe(onTagsClick);
    });

    it("should handle click on 'search' tab", () => {
        const component = renderer.create(
            <RecipesTabs
                activePage="search"
                onLibraryClick={onLibraryClick}
                onRecipeBoxClick={onRecipeBoxClick}
                onFavoritesClick={onFavoritesClick}
                onTagsClick={onTagsClick}
                onSearchClick={onSearchClick}
            />
        );
        const button = component.root.find(
            node =>
                node.props.className &&
                node.props.className.indexOf("pz-navtabs-button--active") !== -1
        );
        expect(button.props.onClick).toBe(onSearchClick);
    });
});
